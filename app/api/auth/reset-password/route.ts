// @/app/api/auth/reset-password/route.ts

import { NextResponse } from "next/server"
import { resetPassword } from "@/src/lib/auth/auth.services";

export async function POST(request: Request) {
  try {
    console.log("API /reset-password hit");
    const { token, newPassword } = await request.json();
    const response = await resetPassword(token, newPassword);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || "Erreur lors de la réinitialisation" },
      { status: 500 }
    )
  }
}
