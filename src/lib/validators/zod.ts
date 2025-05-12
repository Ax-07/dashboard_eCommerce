import { object, string } from "zod";

/**
 * Vérifie si l'email est valide
 */
export const emailValidation = object({
  email: string().email("Invalid email"),
});

/**
 * Vérifie si le token est valide
 * Vérifie si le mot de passe est valide (entre 8 et 32 caractères)
 */
export const resetPasswordSchema = object({
  token: string().min(32, "Token invalide"),
  newPassword: string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .max(32, "Le mot de passe est trop long"),
});

export const registerSchema = object({
  name: string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .max(32, "Name must be less than 32 characters"),
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
