// @/src/lib/auth/auth.actions.ts
"use server"; // Indique que ce fichier ne s'exécute que côté serveur

import {
  registerUser,
  requestPasswordReset,
  resetPassword,
  deleteUser,
} from "@/src/lib/auth/auth.services";
import { getAuthSession } from "./auth.config";
import { z } from "zod";
import { registerSchema } from "./auth.validators";

/**
 * Inscription d'un utilisateur avec Server Actions
 */
export async function registerAction(
  name: string,
  email: string,
  password: string
) {
  try {
    registerSchema.parse({ name, email, password });

    // Exécuter l'inscription
    return await registerUser(name, email, password);
  } catch (error) {
    console.error(error);
    return { success: false, error: "Données invalides" };
  }
}

/**
 * Suppression d'un utilisateur avec Server Actions
 * @param id
 * @returns
 */
export async function DeleteUserAction(id: string) {
  // Vérifie que l'identifiant est une chaîne de caractères
  const schema = z.string();
  schema.parse(id);

  // Récupérer la session de l'utilisateur
  const session = await getAuthSession();
  if (!session || !session.user) {
    return { success: false, error: "Authentification requise" };
  }

  // Vérifier que l'utilisateur connecté correspond à l'ID de l'utilisateur à supprimer
  if (session.user.id !== id) {
    console.warn(
      `Tentative de suppression non autorisée par l'utilisateur ${session.user.id}`
    );
    return {
      success: false,
      error: "Vous n'êtes pas autorisé à supprimer cet utilisateur",
    };
  }

  return await deleteUser(id);
}

/**
 * Demande de réinitialisation du mot de passe
 */
export async function forgotPasswordAction(formData: FormData) {
  const email = formData.get("email") as string;

  // Validation stricte de l'email
  const schema = z.string().email("Email invalide");
  schema.parse(email);

  await requestPasswordReset(email);
}

/**
 * Réinitialisation du mot de passe avec un token
 */
export async function resetPasswordAction(token: string, newPassword: string) {
  // Validation stricte du token et du mot de passe
  const schema = z.object({
    token: z.string().min(10, "Token invalide"),
    newPassword: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  });

  schema.parse({ token, newPassword });

  return await resetPassword(token, newPassword);
}
