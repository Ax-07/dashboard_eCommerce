import bcrypt from 'bcrypt';

/**
 * Fonction pour saler et hasher un mot de passe
 * @param password 
 * @returns 
 */
export default async function saltAndHashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }