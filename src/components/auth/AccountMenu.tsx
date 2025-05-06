"use client"

import React from "react";
import userIconSvg from "@/src/assets/faUser.svg";

import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import Image from "next/image";

import { DeleteAccountButton, LogoutButton, LoginButtons } from "./AuthButtons";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu";

export const AccountMenu: React.FC = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { theme, setTheme } = useTheme();

  if (!session?.user || !userId) {
    return <LoginButtons />;
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar className="size-9 items-center justify-center ">
          {session.user.image ? (
            <>
              <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
              <AvatarImage
                src={session.user.image}
                alt={`${session.user.name ?? "-"}'s profile picture`}
              />
            </>
          ) : (
            <Image src={userIconSvg} alt="User icon" className="size-6" />
          )}
        </Avatar>
      </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Bonjour! {session.user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <a href={`/dashboard`}>Dashboard</a>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <a href={`/dashboard/account`}>Account</a>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <a href={`/dashboard/profile`}>Profile</a>
          </DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Settings</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="flex items-center justify-between">
                    {"Themes"}
                    {theme === "light" && (
                      <Sun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    )}
                    {theme === "dark" && (
                      <Moon className="size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    )}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem onClick={() => setTheme("light")}>
                        Light
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("dark")}>
                        Dark
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme("system")}>
                        System
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <DeleteAccountButton userId={userId}/>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
