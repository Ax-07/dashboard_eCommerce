// @/src/lib/validations/user.zod.ts
import { z } from "zod";

// Enums
export const RoleEnum = z.enum(["customer", "admin", "manager", "support"]);
export const NotificationTypeEnum = z.enum([
  "order_update",
  "promotion",
  "wishlist_reminder",
  "system",
  "custom",
]);

// --- Schemas des modèles ---

export const UserRoleSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().cuid(),
  role: RoleEnum,
});

export const AddressSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().cuid(),
  fullName: z.string(),
  street: z.string(),
  city: z.string(),
  postalCode: z.string(),
  country: z.string(),
  phone: z.string().optional(),
  isDefault: z.boolean().default(false),
  customerId: z.string().uuid().nullable().optional(),
});

export const UserActivitySchema = z.object({
  id: z.string().uuid(),
  userId: z.string().cuid(),
  activity: z.string(),
  timestamp: z.date(),
  ipAddress: z.string().optional(),
});

export const CustomerSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email().nullable().optional(),
  phone: z.string().nullable().optional(),
  addresses: z.array(AddressSchema),
});

export const NotificationSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().cuid(),
  type: NotificationTypeEnum,
  title: z.string(),
  message: z.string().nullable().optional(),
  url: z.string().url().nullable().optional(),
  metadata: z.unknown().nullable().optional(),
  isRead: z.boolean().default(false),
  sentAt: z.date(),
  readAt: z.date().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const UserSchema = z.object({
  id: z.string().cuid(),
  name: z.string().nullable().optional(),
  email: z.string().email().nullable().optional(),
  password: z.string().nullable().optional(),
  emailVerified: z.date().nullable().optional(),
  avatar: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  stripeCustomerId: z.string().nullable().optional(),

  // Relations
  accounts: z.array(z.unknown()).optional(),    // NextAuth Account[]
  sessions: z.array(z.unknown()).optional(),    // NextAuth Session[]
  addresses: z.array(AddressSchema).optional(),
  orders: z.array(z.unknown()).optional(),      // Order[]
  carts: z.array(z.unknown()).optional(),       // Cart[]
  reviews: z.array(z.unknown()).optional(),     // Review[]
  wishlists: z.array(z.unknown()).optional(),   // Wishlist[]
  notifications: z.array(NotificationSchema).optional(),

  resetToken: z.string().nullable().optional(),
  resetTokenExpiry: z.date().nullable().optional(),

  isActive: z.boolean().default(true),
  isVerified: z.boolean().default(false),
  isVIP: z.boolean().default(false),
  marketingOptIn: z.boolean().default(false),

  roles: z.array(UserRoleSchema).optional(),
  activityLogs: z.array(UserActivitySchema).optional(),

  totalOrders: z.number().int().nonnegative().default(0),
  totalSpent: z.number().nonnegative().default(0),
  tags: z.array(z.string()).optional(),
  internalNotes: z.string().nullable().optional(),
  lastLoginAt: z.date().nullable().optional(),
});

export type UserInput = z.infer<typeof UserSchema>;
export type UserRoleInput = z.infer<typeof UserRoleSchema>;