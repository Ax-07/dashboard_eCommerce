// @/app/api/auth/[...nextauth]/route.ts

import { handlers } from "@/src/lib/auth/auth.config";

export const { GET, POST } = handlers;
