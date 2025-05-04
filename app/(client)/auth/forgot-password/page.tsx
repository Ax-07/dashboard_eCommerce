// @/app/(client)/auth/forgot-password/page.tsx
"use client";

import React from "react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { forgotPasswordAction } from "@/src/lib/auth/auth.actions";

export default async function ForgotPasswordPage({searchParams}: {searchParams: {success: string, error: string}}) {

  const {success, error} = searchParams || {};

  return (
    <section className="py-20">
      <div className="container mx-auto max-w-md">
        <h1 className="mb-4 text-2xl font-bold">Mot de passe oublié</h1>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        
        <form action={forgotPasswordAction} className="space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="Votre email"
            required
            autoComplete="email"
            className="w-full rounded border p-2"
          />
          <Button type="submit">
            Envoyer le lien de réinitialisation
          </Button>
        </form>
      </div>
    </section>
  )
}
