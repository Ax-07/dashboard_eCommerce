// @/src/lib/auth/auth.services.ts
"use server"; // Indique que ce fichier ne s'exécute que côté serveur

import { prisma } from "@/src/lib/database/prisma.client";
import bcrypt from "bcrypt";
import {
  forgotPasswordSchema,
  registerSchema,
  resetPasswordSchema,
  signInSchema,
} from "./auth.validators";
import saltAndHashPassword from "@/src/utils/hashPassword";
import {
  compareHashedToken,
  generateResetToken,
} from "@/src/utils/generateToken";
import { sendMail } from "../mail/mail.service";
import { resetPasswordTemplate } from "../mail/mail.templates";
import { createUser, getUserByEmail } from "@/src/lib/database/user.queries";

/**
 * Récupère un utilisateur depuis la base de données
 */
export async function authenticateUser(email: string, password: string) {
  try {
    signInSchema.parse({ email, password });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return { success: false, error: "Utilisateur non trouvé !" };
    if (!user.password) return { success: false, error: "Mot de passe non défini !" };

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return { success: false, error: "Mot de passe incorrect !" };

    return { success: true, user };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Enregistre un utilisateur avec hash du mot de passe
 */
export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  try {
    registerSchema.parse({ name, email, password });

    // 2) Vérifier si l'utilisateur existe déjà
    const existingUser = await getUserByEmail(email);
    if (existingUser)
      return { success: false, error: "Cet email est déjà utilisé." };

    // 3) Hasher le mot de passe
    const hashedPassword = await saltAndHashPassword(password);

    // 4) Créer le user
    // await prisma.user.create({
    //   data: { name, email, password: hashedPassword },
    // });
    await createUser({ name, email, password: hashedPassword });

    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Supprime utilisateur de la base de données
 */
export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Génère un token de réinitialisation et envoie l'email
 * @param email - Email de l'utilisateur demandant un reset
 */
export async function requestPasswordReset(email: string) {
  // Validation avec Zod
  const validation = forgotPasswordSchema.safeParse({ email });
  if (!validation.success) {
    throw new Error(
      validation.error.errors.map((err) => err.message).join(", ")
    );
  }

  // Rechercher l'utilisateur
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    // Ne pas révéler si l'email existe ou non pour la sécurité "user enumeration" qui consiste à chercher des emails valides.
    return { success: true };
  }

  // Générer un token sécurisé
  const { resetToken, hashedToken } = generateResetToken();

  // Mettre à jour l'utilisateur avec le token et la date d'expiration
  await prisma.user.update({
    where: { email },
    data: {
      resetToken: hashedToken,
      resetTokenExpiry: new Date(Date.now() + 3600000), // Expire en 1 heure
    },
  });

  // Construire l'URL de réinitialisation
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}`;
  const { subject, html } = resetPasswordTemplate(resetUrl);

  // Envoyer l'email de réinitialisation
  await sendMail({ email, subject, html });

  return { success: true };
}

/**
 * 🔑 Vérifie le token et met à jour le mot de passe
 * @param token - Token fourni par l'utilisateur
 * @param newPassword - Nouveau mot de passe
 */
export async function resetPassword(token: string, newPassword: string) {
  // Validation avec Zod
  const validation = resetPasswordSchema.safeParse({ token, newPassword });
  if (!validation.success) {
    throw new Error(
      validation.error.errors.map((err) => err.message).join(", ")
    );
  }

  // Rechercher l'utilisateur avec un token valide
  const user = await prisma.user.findFirst({
    where: {
      resetTokenExpiry: { gte: new Date() }, // Token encore valide
    },
  });

  if (!user || !compareHashedToken(token, user.resetToken!)) {
    throw new Error("Token invalide ou expiré");
  }

  // Hasher le nouveau mot de passe
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Mettre à jour l'utilisateur et supprimer le token
  await prisma.$transaction([
    prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    }),
  ]);

  return { success: true };
}
