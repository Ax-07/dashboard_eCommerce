// @/app/auth/reset-password/ResetPasswordForm.tsx
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";

// Schéma de validation avec Zod
const resetSchema = z
  .object({
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirm"],
  });

type ResetFormData = z.infer<typeof resetSchema>;

interface ResetPasswordFormProps {
  token: string;
  error?: string;
}

export default function ResetPasswordForm({ token, error }: ResetPasswordFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
    mode: "onChange"
  });

  async function onSubmit(data: ResetFormData) {
    try {
      // Appeler l'API qui exécute la logique côté serveur
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: data.password }),
      });
      const json = await res.json();
      if (!json.success) {
        // Afficher l'erreur renvoyée par le serveur
        alert(json.error || "Erreur lors de la réinitialisation.");
      } else {
        // Redirection en cas de succès
        router.push("/auth?resetSuccess=1");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur serveur.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <Input
        type="password"
        placeholder="Nouveau mot de passe"
        {...register("password")}
        required
        className="w-full rounded border p-2"
      />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      <Input
        type="password"
        placeholder="Confirmer le mot de passe"
        {...register("confirm")}
        required
        className="w-full rounded border p-2"
      />
      {errors.confirm && <p className="text-red-500">{errors.confirm.message}</p>}
      <Button type="submit" disabled={!isValid || isSubmitting}>
        {isSubmitting ? "En cours..." : "Réinitialiser"}
      </Button>
    </form>
  );
}
