// @/src/mock/marketing.mock.ts

import { MarketingStats } from "../lib/validators/marketing.zod";

export const mockMarketingStats: MarketingStats[] = [
  {
    userId: "d290f1ee-6c54-4b01-90e6-d701748f0851",
    emailOpenRate: 45,    // en pourcentage
    emailClickRate: 12,   // en pourcentage
    lastCampaign: "Summer Sale 2025",
    lastSentAt: new Date("2025-05-05T08:00:00Z"),
  },
  {
    userId: "e7a1c2d3-4b5e-6f7a-8b9c-0d1e2f3a4b5c",
    emailOpenRate: 60,
    emailClickRate: 20,
    lastCampaign: "Spring Promo 2025",
    lastSentAt: new Date("2025-04-20T10:30:00Z"),
  },
];
