// src/components/custom/ComboSearchInput.tsx
"use client";

import * as React from "react";
import { cn } from "@/src/utils/tailwind_cn";
import { Separator } from "../ui/separator";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown, SearchIcon } from "lucide-react";

interface ComboSearchInputProps {
  /** options de colonnes : valeur interne et label affiché */
  columns: { value: string; label: string }[];
  /** colonne sélectionnée */
  selectedColumn: string;
  /** callback quand on change la colonne */
  onColumnChange: (col: string) => void;
  /** texte recherché */
  searchValue: string;
  /** callback quand on change le texte */
  onSearchChange: (value: string) => void;
  /** placeholder du champ texte */
  placeholder?: string;
  className?: string;
}

const ComboSearchInput: React.FC<ComboSearchInputProps> = ({
  columns,
  selectedColumn,
  onColumnChange,
  searchValue,
  onSearchChange,
  placeholder = "Rechercher…",
  className,
}) => {
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Transforme en options attendues par votre Combobox
  const comboOptions = columns.map(({ value, label }) => ({
    value,
    label,
    description: "",
  }));

  const handleSelect = (value: string) => {
    setOpen(false);
    onColumnChange(value);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      className={cn(
        "relative flex w-100 h-9 items-center rounded-md gap-2 border !border-primary/50 px-3",
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/0 border-input min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
        open && "border-ring ring-ring/50 ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
    >
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <input
        ref={inputRef}
        type="search"
        placeholder={placeholder}
        className={cn(
          "placeholder:text-muted-foreground flex w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
        )}
        value={searchValue}
        onChange={(e) => onSearchChange(e.currentTarget.value)}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "absolute right-0 border-none rounded-tl-none rounded-bl-none",
              "h-8.5 w-[120px] justify-between border",
              "data-[state=open]:bg-accent data-[state=open]:ring-[0px]",
              className
            )}
          >
            {comboOptions.find((opt) => opt.value === selectedColumn)?.label ||
              "Colonne"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-100 p-0 border" align="end">
          <Command>
            <CommandInput placeholder={placeholder} className="h-9" />
            <CommandList>
              <CommandEmpty>Aucune colonne</CommandEmpty>
              <CommandGroup>
                {comboOptions.map((option, index) => (
                  <CommandItem
                    key={index}
                    value={option.value}
                    onSelect={handleSelect}
                    className="flex items-center"
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        selectedColumn === option.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Separator
        orientation="vertical"
        className="absolute top-0 right-[120px] h-full"
      />
    </div>
  );
};

export default ComboSearchInput;
