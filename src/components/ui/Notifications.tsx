// @/src/components/Notifications.tsx
import * as React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { Button } from "./button";
import { BellIcon } from "lucide-react";


interface Notification {
  id: number;
  message: string;
}

// Exemple de notifications statiques
const sampleNotifications: Notification[] = [
  { id: 1, message: "Nouvelle commande reçue !" },
  { id: 2, message: "Mise à jour du système disponible." },
  { id: 3, message: "Vous avez un nouveau message." },
];

export const Notifications: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <BellIcon className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {sampleNotifications.length > 0 ? (
          sampleNotifications.map((notification) => (
            <DropdownMenuItem key={notification.id}>
              {notification.message}
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem>Aucune notification</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
