// @/src/lib/validators/marketing.zod.ts

import { z } from "zod";

export const MarketingSchema = z.object({
  isFeatured:       z.boolean(),
  isBestSeller:     z.boolean(),
  isLimitedEdition: z.boolean(),
  isNew:            z.boolean(),
  isPopular:        z.boolean(),
  isTrending:       z.boolean(),
});

export type MarketingInput = z.infer<typeof MarketingSchema>;

export const MarketingStatsSchema = z.object({
  userId:        z.string(),
  emailOpenRate: z.number().min(0).max(100),
  emailClickRate: z.number().min(0).max(100),
  lastCampaign:  z.string(),
  lastSentAt:    z.date(),
});

export type MarketingStats = z.infer<typeof MarketingStatsSchema>;