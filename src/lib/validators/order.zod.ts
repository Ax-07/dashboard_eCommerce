// @/src/lib/validations/order.zod.ts
import { z } from "zod";
import { CustomerSchema, UserSchema } from "./user.zod";

// Enums
export const RefundStatusEnum = z.enum(["none", "requested", "refunded"]);
export const OrderStatusEnum = z.enum([
  "pending", "paid", "processing", "shipped", "delivered",
  "cancelled", "refunded", "return_requested", "return_approved"
]);
export const PaymentStatusEnum = z.enum(["paid", "pending", "failed", "refunded"]);
export const ShippingStatusEnum = z.enum(["pending", "paid", "processing", "shipped", "delivered", "canceled", "complete", "refunded", "retur_requested", "return_approved"]);
export const BillingStatusEnum = z.enum(["pending", "paid", "failed"]);
export const RefundRequestStatusEnum = z.enum(["pending", "approved", "rejected", "refunded"]);
export const ReturnStatusEnum = z.enum(["pending", "received", "rejected"]);
export const OrderTypeEnum = z.enum(["standard", "subscription", "sale", "flash_sale", "pre_order", "back_order", "return"]);

// Address schema (supposé défini ailleurs, à adapter si nécessaire)
const AddressSchema = z.object({
  id: z.string().uuid(),
  fullName: z.string(),
  street: z.string(),
  city: z.string(),
  postalCode: z.string(),
  country: z.string(),
});

// Models
export const OrderItemSchema = z.object({
  id: z.string().uuid(),
  orderId: z.string().uuid(),
  productId: z.string(),
  productName: z.string(),
  sku: z.string(),
  quantity: z.number().int().nonnegative(),
  unitPrice: z.number().nonnegative(),
  totalPrice: z.number().nonnegative(),
  variantOptions: z.array(z.string()),
  refundStatus: RefundStatusEnum,
  returnEligible: z.boolean().optional().default(true),
});

export const PaymentSchema = z.object({
  id: z.string().uuid(),
  method: z.string(),
  provider: z.string(),
  transactionId: z.string().nullable(),
  status: PaymentStatusEnum,
  amount: z.number().nonnegative(),
  paidAt: z.date().nullable(),
  refundedAmount: z.number().nullable(),
});

export const ShippingInfoSchema = z.object({
  id: z.string().uuid(),
  method: z.string(),
  trackingNumber: z.string().nullable(),
  trackingUrl: z.string().url().nullable(),
  carrier: z.string().nullable(),
  shippingCost: z.number().nonnegative(),
  insuranceAmount: z.number().nonnegative(),
  insuranceStatus: z.boolean().optional().default(false),
  status: ShippingStatusEnum,
  shippedAt: z.date().nullable(),
  deliveredAt: z.date().nullable(),
  estimatedDelivery: z.date().nullable(),
  addressId: z.string().uuid(),
  address: AddressSchema,
});

export const BillingInfoSchema = z.object({
  id: z.string().uuid(),
  method: z.string(),
  transactionId: z.string().nullable(),
  status: BillingStatusEnum,
  billedAt: z.date().nullable(),
  amount: z.number().nonnegative(),
  addressId: z.string().uuid(),
  address: AddressSchema,
});

export const OrderEventSchema = z.object({
  id: z.string().uuid(),
  orderId: z.string().uuid(),
  status: OrderStatusEnum,
  note: z.string().nullable(),
  updatedBy: z.string().nullable(),
  timestamp: z.date(),
});

export const RefundRequestSchema = z.object({
  id: z.string().uuid(),
  orderId: z.string().uuid(),
  reason: z.string(),
  status: RefundRequestStatusEnum,
  requestedAt: z.date(),
  processedAt: z.date().nullable(),
  refundedAmount: z.number().nullable(),
  processedBy: z.string().nullable(),
});

export const ReturnLogSchema = z.object({
  id: z.string().uuid(),
  orderId: z.string().uuid(),
  items: z.array(z.string()),
  reason: z.string(),
  returnStatus: ReturnStatusEnum,
  returnRequestedAt: z.date(),
  returnReceivedAt: z.date().nullable(),
  processedBy: z.string().nullable(),
});

export const InternalNoteSchema = z.object({
  id: z.string().uuid(),
  orderId: z.string().uuid(),
  note: z.string(),
  createdAt: z.date(),
  createdBy: z.string(),
});

export const OrderTagSchema = z.object({
  id: z.string().uuid(),
  orderId: z.string().uuid(),
  tag: z.string(),
  createdAt: z.date(),
  createdBy: z.string(),
});

// Schéma principal Order
export const OrderSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  customerId: z.string().uuid().optional(),
  user: UserSchema.partial().optional(),
  customer: CustomerSchema.partial().optional(),
  items: z.array(OrderItemSchema),

  totalAmount: z.number().nonnegative(),
  subtotal: z.number().nonnegative(),
  taxAmount: z.number().nonnegative(),
  shippingCost: z.number().nonnegative(),
  discount: z.number().optional(),

  type: OrderTypeEnum,
  status: OrderStatusEnum,

  paymentId: z.string().uuid(),
  payment: PaymentSchema,

  shippingId: z.string().uuid(),
  shipping: ShippingInfoSchema,

  billingId: z.string().uuid(),
  billing: BillingInfoSchema,

  history: z.array(OrderEventSchema),
  invoiceUrl: z.string().url().nullable(),
  internalNote: z.string().nullable(),
  tags: z.array(OrderTagSchema),

  createdAt: z.date(),
  updatedAt: z.date(),
  cancelledAt: z.date().nullable(),
  refundedAt: z.date().nullable(),
});

export type OrderInput = z.infer<typeof OrderSchema>;
export type OrderItemInput = z.infer<typeof OrderItemSchema>;
export type OrderOutput = z.infer<typeof OrderSchema>;