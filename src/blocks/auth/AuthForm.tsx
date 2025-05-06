// "use client";

import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerAction } from "@/src/lib/auth/auth.actions";
import { registerSchema, signInSchema } from "@/src/lib/auth/auth.validators";

/**
 * Props pour rendre le composant plus flexible :
 * - `registerUser?`: une fonction externe pour l'inscription (Dependency Injection).
 * - `onSuccessRedirect?`: URL de redirection après connexion.
 * - etc.
 */
type AuthFormProps = {
  isRegistering: boolean;
  onSuccessRedirect?: string;
};

const AuthForm: React.FC<AuthFormProps> = ({
  isRegistering,
  onSuccessRedirect = "/dashboard",
}) => {
  const router = useRouter();

  const {
    register, // Fonction pour enregistrer les champs du formulaire
    handleSubmit, // Fonction pour gérer la soumission du formulaire
    formState: { errors, isSubmitting }, // Informations sur le formulaire (erreurs, soumission en cours)
  } = useForm({
    resolver: zodResolver(isRegistering ? registerSchema : signInSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      if (isRegistering) {
        await registerAction(data.name, data.email, data.password);
      }
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }
    } catch (error) {
      throw new Error((error as Error).message);
    }

    router.push(onSuccessRedirect);
  };

  return (
    <div className="mx-auto w-full max-w-sm rounded-md shadow-sm">
      <div className="mb-4 flex flex-col items-center">
        <p className="text-2xl font-bold">
          {isRegistering ? "Inscription" : "Connexion"}
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        {isRegistering && (
          <>
            <Label htmlFor="name" className="hidden">
              {"Nom d'utilisateur"}
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Nom d'utilisateur"
              {...register("name", { required: "Nom d'utilisateur requis" })}
              className="w-full rounded border"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </>
        )}
        <Label htmlFor="email" className="hidden">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email requis" })}
          className="w-full rounded border"
          required
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
        <div className="flex flex-col">
          <Label htmlFor="password" className="hidden">
            Mot de passe
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Mot de passe"
            {...register("password", { required: "Mot de passe requis" })}
            className="w-full rounded border"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
          <a
            href="/auth/forgot-password"
            className="ml-auto mt-2 text-sm text-primary"
          >
            Mot de passe oublié ?
          </a>
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isRegistering ? "S'inscrire" : "Se connecter"}
        </Button>
      </form>
    </div>
  );
};

export default AuthForm;
