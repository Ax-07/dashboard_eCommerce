// @/app/(client)/auth/page.tsx
"use client";

import React from "react";
import {
  LoginWithGithubButton,
  LoginWithGoogleButton,
} from "@/src/components/auth/AuthButtons";
import AuthForm from "@/src/blocks/auth/AuthForm";
import { useState } from "react";
import Navbar from "@/src/blocks/Navbar/Navbar";
import { useAuth } from "@/src/hooks/useAuth";
import { useRouter } from "next/navigation";

const Auth = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const { session } = useAuth();
  const router = useRouter();

  if (session && session.user) {
    router.push("/");
  }
  
  return (
    <>
      <Navbar />
      <section className="py-20">
        <div className="container">
          <div className="flex flex-col">
            <div className="mx-auto w-full max-w-sm rounded-md px-6 py-4 shadow-sm">
              <div className="mb-4 flex flex-col items-center">
                <img
                  src="https://shadcnblocks.com/images/block/block-1.svg"
                  alt="logo"
                  className="mb-4 h-10 w-auto rounded-full bg-primary p-1"
                />
                <p className="mb-2 text-2xl font-bold">Shadcnblocks.com</p>
                <p className="text-muted-foreground">
                  Sign up in less than 2 minutes.
                </p>
              </div>
              <AuthForm isRegistering={isRegistering} />
              <div className="flex items-center space-x-4 p-4">
                <hr className="w-full border-muted-foreground" />
                <p className="mx-auto">or</p>
                <hr className="w-full border-muted-foreground" />
              </div>
              <LoginWithGoogleButton />
              <LoginWithGithubButton />
            </div>
            <div className="mx-auto flex justify-center gap-1 text-sm text-muted-foreground">
              {isRegistering ? (
                <>
                  <p>Déjà un compte ?</p>
                  <p
                    className="cursor-pointer font-medium text-primary"
                    onClick={() => setIsRegistering(false)}
                  >
                    Se connecter
                  </p>
                </>
              ) : (
                <>
                  <p>Pas encore de compte ?</p>
                  <p
                    className="cursor-pointer font-medium text-primary"
                    onClick={() => setIsRegistering(true)}
                  >
                    S’inscrire
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Auth;
