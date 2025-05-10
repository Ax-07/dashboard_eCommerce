// @/src/blocks/produits/forms/ProductGeneralForm.tsx
"use client";

import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Control, UseFormRegister, UseFormReturn } from "react-hook-form";
import { ProductInput } from "@/src/lib/validators/product.zod";
import { cn } from "@/src/utils/tailwind_cn";
import { Textarea } from "@/src/components/ui/textarea";
import Combobox from "@/src/components/custom/combobox";
import { BtnAddCategory } from "./AddcategoryForm";
import ImagePicker from "@/src/components/ui/image-picker";
import { getCategoriesWithSubcategories, PRODUCTS } from "@/src/mock";

// const categories = [
//   {
//     id: "fleurs",
//     name: "Fleurs",
//     slug: "fleurs",
//     subCategories: [
//       { id: "greenhouse", name: "Greenhouse" },
//       { id: "glasshouse", name: "Glasshouse" },
//       { id: "indoor", name: "Indoor" },
//       { id: "outdoor", name: "Outdoor" },
//     ],
//   },
//   {
//     id: "huiles",
//     name: "Huiles",
//     slug: "huiles",
//     subCategories: [
//       { id: "huiles-essentielles", name: "Huiles essentielles" },
//       { id: "huiles-cosmetiques", name: "Huiles cosmétiques" },
//       { id: "huiles-alimentaires", name: "Huiles alimentaires" },
//     ],
//   },
//   {
//     id: "resines",
//     name: "Résines",
//     slug: "resines",
//     subCategories: [
//       { id: "hash", name: "Hash" },
//       { id: "rosin", name: "Rosin" },
//       { id: "live-resin", name: "Live resin" },
//     ],
//   },
//   {
//     id: "eliquides",
//     name: "E-liquides",
//     slug: "eliquides",
//     subCategories: [
//       { id: "eliquides-nicotine", name: "E-liquides avec nicotine" },
//       { id: "eliquides-sans-nicotine", name: "E-liquides sans nicotine" },
//     ],
//   },
//   {
//     id: "graines",
//     name: "Graines",
//     slug: "graines",
//     subCategories: [
//       { id: "feminisees", name: "Féminisées" },
//       { id: "regulars", name: "Regulars" },
//     ],
//   },
//   {
//     id: "accessoires",
//     name: "Accessoires",
//     slug: "accessoires",
//     subCategories: [
//       { id: "fumer", name: "Fumer" },
//       { id: "vaporiser", name: "Vaporiser" },
//       { id: "cultiver", name: "Cultiver" },
//     ],
//   },
// ];

const categories = getCategoriesWithSubcategories(PRODUCTS);
interface ProductGeneralFormProps {
  form: UseFormReturn<ProductInput>;
  control: Control<ProductInput>;
  register: UseFormRegister<ProductInput>;
  className?: string;
}

const ProductGeneralForm: React.FC<ProductGeneralFormProps> = ({
  form,
  control,
  register,
  className,
}) => {
  const { watch } = form;

  const selectedCategoryId = watch("categoryId"); console.log("selectedCategoryId", selectedCategoryId);
  const currentCategory = categories.find((cat) => {
    return cat.id === selectedCategoryId
  }
  ); console.log("currentCategory", currentCategory);
  const subCategories = currentCategory?.subCategories ?? [];
  const currentSubCategory = subCategories.find((sub) => {
   return sub.id === watch("subCategoryId");
  }); console.log("currentSubCategory", currentSubCategory);
    
  return (
    <div className={cn("", className)}>
      <p className="text-sm text-muted-foreground">
        Remplissez les informations générales de votre produit. Ces informations
        seront visibles par vos clients.
      </p>
      {/* Nom */}
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom du produit *</FormLabel>
            <p className="text-sm text-muted-foreground">
              Indiquez le nom de votre produit.
            </p>
            <FormControl>
              <Input
                placeholder="Ex: OG kush"
                {...field}
              />
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
            <p className="text-sm text-muted-foreground">
              Décrivez votre produit. Ces informations seront visibles par vos
              clients.
            </p>
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
            <FormLabel>Catégorie *</FormLabel>
            <p className="text-sm text-muted-foreground">
              Sélectionnez une catégorie pour votre produit.
            </p>
            <div className="flex flex-row items-center space-x-2">
              <FormControl>
                <Combobox
                  options={categories.map((category) => ({
                    value: category.id!,
                    label: category.name,
                    description: category.name,
                  }))}
                  value={field.value}
                  onSelect={(value) => {
                    field.onChange(value);
                  }}
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
      {subCategories.length !== 0 && (
        <FormField
          control={control}
          name="subCategoryId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Sous-catégorie</FormLabel>
              <p className="text-sm text-muted-foreground">
                Sélectionnez une sous-catégorie pour votre produit.
              </p>
              <div className="flex flex-row items-center space-x-2">
                <FormControl>
                  <Combobox
                    options={subCategories.map((subCategory) => ({
                      value: subCategory.id!,
                      label: subCategory.name,
                      description: subCategory.name,
                    }))}
                    disabled={subCategories.length === 0}
                    value={field.value}
                    onSelect={(value) => {
                      field.onChange(value);
                    }}
                    placeholder="Recherchez une sous-catégorie"
                    buttonLabel="Selectionnez une sous-catégorie"
                    commandEmpty="Cette sous-catégorie n'éxiste pas..."
                  />
                </FormControl>
                <BtnAddCategory parentId={currentCategory?.id || ""} />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {/* Media */}
      <ImagePicker filesUrl={[]} onFileChange={()=> console.log("on file change")} onDeleteFileUrl={()=> console.log("on delete file")}/>
    </div>
  );
};

export default ProductGeneralForm;
