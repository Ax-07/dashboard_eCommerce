"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/src/utils/tailwind_cn";
import { Button } from "@/src/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";

interface ComboboxProps {
  options: { value: string; label: string; description: string }[];
  disabled?: boolean;
  placeholder?: string;
  buttonLabel?: string;
  commandEmpty?: string;
  defaultValue?: string;
  onSelect?: (selected: string) => void;
}

const Combobox: React.FC<ComboboxProps> = ({
  options,
  disabled,
  placeholder,
  buttonLabel,
  commandEmpty,
  defaultValue,
  onSelect,
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[300px] justify-between border", `${open && "border-ring ring-ring/50 ring-[3px]"}`)}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : buttonLabel || "Sélectionner une option"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 border">
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty>{commandEmpty}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    onSelect?.(currentValue === value ? "" : currentValue);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
