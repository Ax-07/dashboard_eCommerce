import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/src/utils/tailwind_cn";

interface ComboboxCheckboxProps {
  options: string[]; // Liste des options à afficher dans le combobox
  selectedOptions: string[]; // Liste des options sélectionnées
  onSelect: (option: string) => void; // Fonction appelée lors de la sélection d'une option
  placeholder?: string; // Texte d'espace réservé à afficher lorsque rien n'est sélectionné
  label?: string; // Étiquette du combobox
  icon?: React.ReactNode; // Icône à afficher à côté de l'étiquette
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined; // Variante du bouton (par exemple, "outline", "ghost", etc.)
  size?: "default" | "icon" | "sm" | "lg" | null | undefined; // Taille du bouton (par exemple, "sm", "lg", etc.)
  className?: string; // Classes CSS supplémentaires à appliquer au bouton
}
const ComboboxCheckbox: React.FC<ComboboxCheckboxProps> = ({
  options,
  selectedOptions,
  onSelect,
  placeholder,
  label,
  icon,
  variant = "outline",
  size = "default",
  className
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild className={cn("", className)}>
        <Button variant={variant} size={size} className="">
          {icon && <span className="">{icon}</span>}
          {label && <span>{label}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[200px] p-0 border">
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option}
                  onSelect={() => {
                    onSelect(option);
                  }}
                  className="flex items-center"
                >
                  <Checkbox
                    checked={selectedOptions.includes(option)}
                    onCheckedChange={() => onSelect(option)}
                    className="mr-2"
                  />
                  <span>{option}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboboxCheckbox;
