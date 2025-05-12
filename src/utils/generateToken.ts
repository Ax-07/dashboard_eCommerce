// @/utils/generateToken.ts

import crypto from "crypto";
import bcrypt from "bcrypt";

/**
 * Genère un token de réinitialisation de mot de passe et le hash en même temps pour le stocker en base de données
 * @returns {Object} object with resetToken and hashedToken
 */
export function generateResetToken(): { resetToken: string; hashedToken: string } {
  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = bcrypt.hashSync(resetToken, 10);
  return { resetToken, hashedToken };
}

/**
 * Compare un token en clair avec un token hashé
 * @param token 
 * @param hashedToken 
 * @returns {boolean} true si les tokens correspondent, sinon false 
 */
export function compareHashedToken (token: string, hashedToken: string): boolean {
    return bcrypt.compareSync(token, hashedToken);
}