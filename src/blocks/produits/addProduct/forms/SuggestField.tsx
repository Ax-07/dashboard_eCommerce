// @/src/blocks/produits/forms/SuggestField.tsx
"use client";

import React, { useState, useMemo } from "react";
import { FormField, FormItem, FormControl, FormMessage } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/src/components/ui/popover";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/src/components/ui/command";
import generateLabelSuggestions from "@/src/utils/generateLabelSuggestions";
import type { UseFormReturn } from "react-hook-form";
import type { ProductInput } from "@/src/lib/validators/product.zod";
import { slugify } from "@/src/utils/slugify";

interface SuggestFieldProps {
  form: UseFormReturn<ProductInput>;
  controlPath: string; // ex: `options.0.values.0.name`
}

export const SuggestField: React.FC<SuggestFieldProps> = ({ form, controlPath }) => {
  const [open, setOpen] = useState(false);
  const value = form.getValues(controlPath as keyof ProductInput) as string;

  // on extrait product name, quantity, unit depuis le form
    const productName = form.watch("name")
    const quantity = form.watch(controlPath.replace(".sku", ".quantity") as keyof ProductInput)
    const unit = form.watch(controlPath.replace(".sku", ".unit") as keyof ProductInput)

  // génère dynamiquement les suggestions
  const suggestions = useMemo(
    () => generateLabelSuggestions(
      String(productName || ""), 
      String(quantity || ""), 
      String(unit || "g")
    ),
    [productName, quantity, unit]
  );

  return (
    <FormField
      control={form.control}
      name={controlPath as any}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger className="w-full rounded-none">
                <Input
                    className="w-full rounded-none"
                  {...field}
                  placeholder="Libellé (ex: og-kush-100g)"
                />
              </PopoverTrigger>
              <PopoverContent className="p-0 w-[300px]" align="start">
                <Command>
                  <CommandInput placeholder="Choisir un libellé…" className="h-8" />
                  <CommandList>
                    <CommandEmpty>Aucune suggestion</CommandEmpty>
                    <CommandGroup>
                      {suggestions.map((s) => (
                        <CommandItem
                          key={s}
                          onSelect={() => {
                            const slug = slugify(s);
                            field.onChange(slug);
                            setOpen(false);
                          }}
                        >
                          {slugify(s)}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
