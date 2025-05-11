// @/lib/database/db.ts
import { prisma } from "./prisma.client";

/**
 * Récupère un utilisateur par son email
 * @param email
 * @returns Promise<User | null>
 */
export async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    console.error(error);
  }
}

/**
 * Récupère un utilisateur par son ID
 * @param id 
 * @returns Promise<User | null>
 */
export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  } catch (error) {
    console.error(error);
  }
}

/**
 * Crée un utilisateur
 * @param data 
 * @returns Promise<User>
 */
export async function createUser(data: { name: string; email: string; password: string }) {
  try {
    const user = await prisma.user.create({ data });
    return user;
  } catch (error) {
    console.error(error);
  }
}

/**
 * Met à jour un utilisateur
 * @param id 
 * @param data 
 * @returns Promise<User>
 */
export async function updateUser(id: string, data: { name: string; email: string }) {
  try {
    const user = await prisma.user.update({ where: { id }, data });
    return user;
  } catch (error) {
    console.error(error);
  }
}