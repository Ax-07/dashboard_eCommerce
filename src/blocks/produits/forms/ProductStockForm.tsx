import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { ProductInput } from "@/src/lib/validators/product.zod";
import { cn } from "@/src/utils/tailwind_cn";
import React from "react";
import { UseFormReturn, Control, UseFormRegister } from "react-hook-form";

interface ProductStockFormProps {
  form: UseFormReturn<ProductInput>;
  control: Control<ProductInput>;
  register: UseFormRegister<ProductInput>;
  className?: string;
}
const ProductStockForm: React.FC<ProductStockFormProps> = ({
  form,
  control,
  register,
  className,
}) => {
  return (
    <div className={cn("", className)}>
      <p className="text-sm text-muted-foreground">
        Remplissez les informations de stock de votre produit. Ces informations
        seront visibles par vos clients.
      </p>
      {/* Stock */}
      <FormField
        control={form.control}
        name="stock.quantity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Quantité en stock</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProductStockForm;
