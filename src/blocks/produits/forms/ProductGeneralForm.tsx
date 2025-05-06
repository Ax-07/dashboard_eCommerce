import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Control, UseFormRegister } from "react-hook-form";
import { ProductInput } from "@/src/lib/validators/product.zod";
import { cn } from "@/src/utils/tailwind_cn";
import { Textarea } from "@/src/components/ui/textarea";
import Combobox from "@/src/components/custom/combobox";
import { BtnAddCategory } from "./AddcategoryForm";

const categories = [
  { id: "fleurs", name: "Fleurs" },
  { id: "huiles", name: "Huiles" },
  { id: "resines", name: "Résines" },
  { id: "eliquides", name: "E-liquides" },
  { id: "accessoires", name: "Accessoires" },
];

const subCategories = [
  { id: "greenhouse", name: "Greenhouse" },
  { id: "glasshouse", name: "Glasshouse" },
  { id: "indoor", name: "Indoor" },
  { id: "outdoor", name: "Outdoor" },
];

interface ProductGeneralFormProps {
  control: Control<ProductInput>;
  register: UseFormRegister<ProductInput>;
  className?: string;
}

const ProductGeneralForm: React.FC<ProductGeneralFormProps> = ({
  control,
  register,
  className,
}) => {
  return (
    <div className={cn("", className)}>
        <p className="text-sm text-muted-foreground">
            Remplissez les informations générales de votre produit. Ces informations seront visibles par vos clients.
        </p>
      {/* Nom */}
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom du produit *</FormLabel>
            <FormControl>
              <Input placeholder="Ex: OG kush" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Description */}
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Décrivez votre produit"
                {...field}
                rows={4}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Catégorie avec Combobox */}
      <FormField
        control={control}
        name="categoryId"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Catégorie</FormLabel>
            <div className="flex flex-row items-center space-x-2">
              <FormControl>
                <Combobox
                  options={categories.map((category) => ({
                    value: category.id,
                    label: category.name,
                    description: category.name,
                  }))}
                  onSelect={field.onChange}
                  placeholder="Recherchez une catégorie"
                  buttonLabel="Selectionnez une catégorie"
                  commandEmpty="Cette catégorie n'éxiste pas..."
                />
              </FormControl>
              <BtnAddCategory />
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Sous catégorie */}
      <FormField
        control={control}
        name="subCategoryId"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Sous-catégorie</FormLabel>
            <div className="flex flex-row items-center space-x-2">
              <FormControl>
                <Combobox
                  options={subCategories.map((category) => ({
                    value: category.id,
                    label: category.name,
                    description: category.name,
                  }))}
                  onSelect={field.onChange}
                  placeholder="Recherchez une sous-catégorie"
                  buttonLabel="Selectionnez une sous-catégorie"
                  commandEmpty="Cette sous-catégorie n'éxiste pas..."
                />
              </FormControl>
              <BtnAddCategory />
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Media */}

    </div>
  );
};

export default ProductGeneralForm;
