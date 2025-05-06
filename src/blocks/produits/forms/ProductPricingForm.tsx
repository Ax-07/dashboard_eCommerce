import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import {
  Control,
  useFieldArray,
  UseFormRegister,
  UseFormReturn,
} from "react-hook-form";
import { ProductInput } from "@/src/lib/validators/product.zod";
import { cn } from "@/src/utils/tailwind_cn";
import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

interface ProductPricingFormProps {
  form: UseFormReturn<ProductInput>;
  control: Control<ProductInput>;
  register: UseFormRegister<ProductInput>;
  className?: string;
}

const units = ["kg", "g", "l", "cl", "ml", "m2", "m3", "mL", "mL2", "mL3"];

const ProductPricingForm: React.FC<ProductPricingFormProps> = ({
  form,
  control,
  register,
  className,
}) => {
  const { fields, append, remove } = useFieldArray({
    name: "options",
    control,
  });
  return (
    <div className={cn("", className)}>
      <p className="text-sm text-muted-foreground">
        Remplissez les informations de prix de votre produit. Ces informations
        seront visibles par vos clients.
      </p>
      <div className="flex flex-row items-center space-x-2">
        {/* Prix unitaire */}
        <FormField
          control={control}
          name="unitPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prix unitaire (€)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Unité */}
        <FormField
          name="unit"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unité</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue="g"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Unité" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((u) => (
                      <SelectItem key={u} value={u}>
                        {u}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Prix */}
      <FormField
        control={control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Prix (€)</FormLabel>
            <FormControl>
              <Input type="number" step="0.01" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Options de prix */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Options d'achat / vente</h3>
          <Button
            type="button"
            onClick={() =>
              append({
                name: "",
                values: [
                  {
                    name: "",
                    unit: form.getValues("unit"),
                    unitPrice: 0,
                    quantity: 0,
                    totalPrice: 0,
                  },
                ],
              })
            }
          >
            Ajouter un groupe
          </Button>
        </div>
        <div className="space-y-4">
          {fields.map((opt, i) => (
            <div key={opt.id} className="border p-4 rounded">
              <div className="flex justify-between items-center mb-2">
                <FormControl>
                  <Input
                    placeholder="Nom du groupe (ex: Prix d'achat)"
                    {...register(`options.${i}.name` as const)}
                  />
                </FormControl>
                <Button
                  variant="destructive"
                  type="button"
                  onClick={() => remove(i)}
                >
                  Supprimer
                </Button>
              </div>
              {/* Sous-table de valeurs */}
              <ValuesTable
                nestIndex={i}
                control={control}
                register={register}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPricingForm;

// Composant auxiliaire pour table de valeurs
function ValuesTable({
  nestIndex,
  control,
  register,
}: {
  nestIndex: number;
  control: Control<ProductInput>;
  register: UseFormRegister<ProductInput>;
}) {
  const { fields, append, remove } = useFieldArray({
    name: `options.${nestIndex}.values`,
    control,
  });
  return (
    <div className="space-y-2">
      {fields.map((item, idx) => (
        <div key={item.id} className="grid grid-cols-6 gap-2">
          <Input
            placeholder="Nom (ex: 100g)"
            {...register(`options.${nestIndex}.values.${idx}.name`)}
          />
          <Input
            type="number"
            placeholder="Quantité"
            {...register(`options.${nestIndex}.values.${idx}.quantity`)}
          />
          <Input
            placeholder="Unité"
            {...register(`options.${nestIndex}.values.${idx}.unit`)}
          />
          <Input
            type="number"
            step="0.01"
            placeholder="Prix unitaire"
            {...register(`options.${nestIndex}.values.${idx}.unitPrice`)}
          />
          <Input
            type="number"
            step="0.01"
            placeholder="Prix total"
            {...register(`options.${nestIndex}.values.${idx}.totalPrice`)}
          />
          <Button
            variant="destructive"
            type="button"
            onClick={() => remove(idx)}
          >
            ×
          </Button>
        </div>
      ))}
      <Button
        type="button"
        onClick={() =>
          append({
            name: "",
            quantity: 0,
            unit: "g",
            unitPrice: 0,
            totalPrice: 0,
          })
        }
      >
        Ajouter valeur
      </Button>
    </div>
  );
}
