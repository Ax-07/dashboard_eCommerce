import { z } from "zod";

export const TicketSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
  subject: z.string(),
  status: z.enum(["open", "in_progress", "closed"]),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  messages: z.array(
    z.object({
      from: z.enum(["user", "support"]),
      content: z.string(),
      timestamp: z.date(),
    })
  ),
});
export type TicketInput = z.infer<typeof TicketSchema>;