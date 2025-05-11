// @/src/lib/auth/auth.validators.ts

import { object, string } from "zod";

/**
 * Validation des paramètres de connexion
 * @param email Email de l'utilisateur
 * @param password Mot de passe de l'utilisateur
 * @returns 
 */
export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

/**
 * Validation des paramètres d'inscription
 * @param name Nom de l'utilisateur
 * @param email Email de l'utilisateur
 * @param password Mot de passe de l'utilisateur
 * @returns
 */
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

/**
 * Validation de l'adresse mail pour la réinitialisation de mot de passe
 * @param email Email de l'utilisateur
 * @returns
 */
export const forgotPasswordSchema = object({
  email: string().min(1, "L'email est requis").email("Format d'email invalide"),
});

/**
 * Validation du token et du nouveau mot de passe pour la réinitialisation
 * @param token Token de réinitialisation
 * @param newPassword Nouveau mot de passe
 * @returns
 */
export const resetPasswordSchema = object({
  token: string().min(32, "Token invalide"),
  newPassword: string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .max(32, "Le mot de passe est trop long"),
});