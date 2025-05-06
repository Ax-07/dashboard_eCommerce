// @/src/components/auth/AuthButtons.tsx
"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import GithubIcon from "@/src/assets/github-mark/github-mark-white.svg";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { useAuth } from "@/src/hooks/useAuth";
import { DeleteUserAction } from "@/src/lib/auth/auth.actions";

export const LoginWithGithubButton = () => {
  const { loginWithGithub } = useAuth();

  return (
    <Button
      color="primary"
      variant="outline"
      type="submit"
      className="mt-2 w-full"
      onClick={loginWithGithub}
    >
      <Image
        src={GithubIcon}
        alt="Github logo"
        width={20}
        height={20}
        className="mr-2"
      />
      Login with GitHub
    </Button>
  );
};

export const LoginWithGoogleButton = () => {
  const { loginWithGoogle } = useAuth();

  return (
    <Button
      color="primary"
      variant="outline"
      type="submit"
      className="mt-2 w-full"
      onClick={loginWithGoogle}
    >
      <FcGoogle className="mr-2 size-5" />
      Login with Google
    </Button>
  );
};

export const LogoutButton = () => {
  return (
    <Button
      color="primary"
      variant="default"
      type="submit"
      className="w-full"
      onClick={async () => {
        await signOut({ redirectTo: "/" });
      }}
    >
      <LogOut className="mr-2 size-5" />
      Logout
    </Button>
  );
};

export const LoginButtons = () => {
  return (
    <Link href="/auth">
      <Button variant="outline" size="sm">
        Log in
      </Button>
    </Link>
  );
};

type DeleteAccountButtonProps = {
  userId: string;
};
export const DeleteAccountButton = ({userId}: DeleteAccountButtonProps) => {
  const onDeleteAccount = async (userId: string) => {
    await DeleteUserAction(userId);
    await signOut();
  }
  return (
    <Button variant="destructive" size="sm" onClick={() => onDeleteAccount(userId!)}>
      Delete account
    </Button>
  )
}
