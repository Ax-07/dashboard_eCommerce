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
