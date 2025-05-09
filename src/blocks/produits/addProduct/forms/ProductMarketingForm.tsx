import { Checkbox } from "@/src/components/ui/checkbox";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Switch } from "@/src/components/ui/switch";
import { ProductInput } from "@/src/lib/validators/product.zod";
import { cn } from "@/src/utils/tailwind_cn";
import React from "react";
import { UseFormReturn, Control, UseFormRegister } from "react-hook-form";

interface ProductMarketingFormProps {
  form: UseFormReturn<ProductInput>;
  control: Control<ProductInput>;
  register: UseFormRegister<ProductInput>;
  className?: string;
}

const ProductMarketingForm: React.FC<ProductMarketingFormProps> = ({
  form,
  control,
  register,
  className,
}) => {
  return (
    <div className={cn("", className)}>
      <p className="text-sm text-muted-foreground">
        Remplissez les informations marketing de votre produit. Ces informations
        seront visibles
      </p>
      {/* Marketing status */}
      <div className="grid grid-cols-3 gap-4">
        <FormLabel className="col-span-3">Statut marketing</FormLabel>
        {Object.entries(form.getValues("marketing") || {}).map(([key, val]) => (
          <FormField
            key={key}
            name={
              `marketing.${key}` as import("react-hook-form").Path<ProductInput>
            }
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2">
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FormLabel className="capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </FormLabel>
              </FormItem>
            )}
          />
        ))}
      </div>
      {/* Promotion */}
      <FormField
        control={form.control}
        name="promotion.isOnSale"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>En promotion</FormLabel>
            </div>
          </FormItem>
        )}
      />
      {/* Champs de promotion additionnels si en promotion */}
      {form.watch("promotion.isOnSale") && (
        <FormField
          control={form.control}
          name="promotion.discountPercentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Réduction (%)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};

export default ProductMarketingForm;
