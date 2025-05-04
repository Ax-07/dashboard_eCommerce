// @/app/(client)/auth/reset-password/page.tsx
"use client";

import ResetPasswordForm from "@/src/blocks/auth/ResetPasswordForm";
import React from "react";

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams?: { token?: string; error?: string };
}) {
  const token = searchParams?.token;

  if (!token) {
    return <p>Aucun token fourni.</p>;
  }

  return (
    <section className="py-20">
      <div className="container mx-auto max-w-md">
        <h1 className="mb-4 text-2xl font-bold">Réinitialiser le mot de passe</h1>
        {/* On peut transmettre aussi un éventuel message d'erreur */}
        <ResetPasswordForm token={token} error={searchParams?.error} />
      </div>
    </section>
  );
}