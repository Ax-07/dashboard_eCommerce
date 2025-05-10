import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const loading = status === "loading";

  useEffect(() => {
    if (!loading && !session) {
      router.push("/auth");
    }
  }, [loading, session, router]);

  const loginWithGithub = async () => {
    await signIn("github", { callbackUrl: "/" });
  };

  const loginWithGoogle = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  const logout = async () => {
    await signOut();
    router.push("/");
  };

  return { session, loading, loginWithGithub, loginWithGoogle, logout };
};
