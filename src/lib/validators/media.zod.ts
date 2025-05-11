//@/src/lib/validators/media.zod.ts

import { z } from 'zod'

export const MediaSchema = z.object({
  url:        z.string().url({ message: "L'URL doit être valide" }),
  type:       z.enum(['image', 'video', 'audio']),
  alt:        z.string().optional(),
  thumbnail:  z.string().url().optional(),
  isPrimary:  z.boolean().optional(),
})

export type MediaInput = z.infer<typeof MediaSchema>
