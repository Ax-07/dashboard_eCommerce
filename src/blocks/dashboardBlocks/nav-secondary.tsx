import * as React from "react";
import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar";

export function NavSecondary({
  groups,
  ...props
}: {
  groups: {
    title: string;
    url?: string;
    icon?: LucideIcon;
    items?: { title: string; url: string; icon: LucideIcon}[];
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      {groups.map((item) => (
        <SidebarGroupContent key={item.title}>
        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
        <SidebarMenu>
          {item.items?.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild >
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
      ))}
    </SidebarGroup>
  );
}
