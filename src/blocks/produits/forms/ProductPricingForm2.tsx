import React, { useEffect } from "react";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import {
  Control,
  Controller,
  useFieldArray,
  UseFormRegister,
  UseFormReturn,
} from "react-hook-form";
import { ProductInput } from "@/src/lib/validators/product.zod";
import { Button } from "@/src/components/ui/button";
import { DeleteIcon, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { cn } from "@/src/utils/tailwind_cn";
import generateLabelSuggestions from "@/src/utils/generateLabelSuggestions";
import { slugify } from "@/src/utils/slugify";
import { SuggestField } from "./SuggestField";

interface ProductPricingFormProps {
  form: UseFormReturn<ProductInput>;
  control: Control<ProductInput>;
  register: UseFormRegister<ProductInput>;
  className?: string;
}

const units = ["kg", "g", "l", "cl", "ml", "pièce"];
const libellésSuggest = [];

/*
  Scénarios où plusieurs groupes tarifaires peuvent être utiles :

  1. Vente au détail vs vente en gros
     - Tarif B2C pour petits volumes (grand public)
     - Tarif B2B / grossiste avec remises à partir d’un certain seuil

  2. Tarification par canal de distribution
     - Site Internet
     - Place de marché (Amazon, eBay…)
     - Boutique physique
     Chaque canal peut avoir ses propres frais ou marges.

  3. Segments de clientèle (VIP, adhérents…)
     - Prix standard
     - Prix fidélité ou membre (réduction permanente ou temporaire)
     - Prix partenaires ou grands comptes

  4. Tarifs dégressifs / échelonnés
     - Palier de remise à partir de X unités
     - Remise supplémentaire à partir de Y unités

  5. Tarification saisonnière ou promotionnelle
     - Prix haute saison vs basse saison
     - Soldes, offres flash, prix de lancement

  6. Prix par zone géographique ou devise
     - France (€), Europe (€), Canada (CAD), États‑Unis (USD)

  7. Formules packagées ou services complémentaires
     - Produit seul
     - Produit + nettoyage
     - Produit + installation

  8. Tarifs contractuels ou devis sur‑mesure
     - Prix catalogue
     - Prix négocié sous contrat
     - Tarifs « à la carte »

  Conservez ce bloc pour vous rappeler des cas d’usage pouvant justifier
  l’ajout de groupes tarifaires au‑delà de « Prix d’achat » et « Prix de vente ».
*/
const ProductPricingForm2: React.FC<ProductPricingFormProps> = ({
  form,
  control,
  register,
  className,
}) => {
  const {
    fields: groups,
    append: appendGroup,
    remove: removeGroup,
    replace,
  } = useFieldArray({
    name: "options",
    control,
  });

  useEffect(() => {
    if (groups.length === 0) {
      replace([
        {
          name: "Prix d’achat",
          values: [
            { name: "", quantity: 0, unit: "g", unitPrice: 0, totalPrice: 0 },
          ],
        },
        {
          name: "Prix de vente",
          values: [
            { name: "", quantity: 0, unit: "g", unitPrice: 0, totalPrice: 0 },
          ],
        },
      ]);
    }
  }, []);

  return (
    <div className={cn("space-y-6", className)}>
      {groups.map((grp, gi) => (
        <div key={grp.id}>
          <div className="flex justify-between items-start mb-2">
            <FormField
              control={control}
              name={`options.${gi}.name`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="Nom du groupe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {gi >= 2 && <Button variant="destructive" onClick={() => removeGroup(gi)}>
              Supprimer
            </Button>}
          </div>
          <OptionValuesTable
            groupIndex={gi}
            form={form}
            control={control}
            register={register}
          />
        </div>
      ))}

      <Button
        onClick={(e) => {
          e.stopPropagation();
          const newIndex = groups.length;
          appendGroup({
            name: "",
            values: [
              { name: "", quantity: 0, unit: "g", unitPrice: 0, totalPrice: 0 },
            ],
          });
          form.clearErrors(`options.${newIndex}`);
        }}
      >
        Ajouter un groupe supplémentaire
      </Button>
    </div>
  );
};

export default ProductPricingForm2;

interface OptionValuesTableProps {
  groupIndex: number;
  form: UseFormReturn<ProductInput>;
  control: Control<ProductInput>;
  register: UseFormRegister<ProductInput>;
}

export const OptionValuesTable: React.FC<OptionValuesTableProps> = ({
  groupIndex,
  form,
  control,
  register,
}) => {
  const { fields, append, remove } = useFieldArray({
    name: `options.${groupIndex}.values`,
    control,
  });

  return (
    <table className="w-full table-fixed border-collapse mb-2">
      <colgroup>
        <col className="w-2/6" /> {/* 33% pour la 1re colonne */}
        <col /> {/* reste automatique */}
        <col />
        <col />
        <col />
        <col className="w-1/12" /> {/* petite colonne pour le bouton */}
      </colgroup>
      <thead>
        <tr className="">
          {["Libellé", "Qté", "Unité", "Prix unitaire", "Prix total", ""].map(
            (h) => (
              <th
                key={h}
                className="border border-r-none px-2 py-1 text-sm text-left bg-muted last:bg-transparent last:border-none"
              >
                {h}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody>
        {fields.map((val, vi) => (
          <tr key={val.id} className="even:bg-muted/50">
            <td className="">
              <SuggestField 
                form={form}
                controlPath={`options.${groupIndex}.values.${vi}.name`}
                />
            </td>
            <td className="">
              <Input
                type="number"
                min={0}
                className="text-right rounded-none"
                {...register(
                  `options.${groupIndex}.values.${vi}.quantity` as const,
                  { valueAsNumber: true }
                )}
              />
            </td>
            <td className="">
              {/* <Input {...register(`options.${groupIndex}.values.${vi}.unit` as const)} /> */}
              <Controller
                control={control}
                name={`options.${groupIndex}.values.${vi}.unit`}
                defaultValue={val.unit}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full rounded-none">
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
                )}
              />
            </td>
            <td className="">
              <Input
                type="number"
                step="0.01"
                min={0}
                className="text-right rounded-none"
                {...register(
                  `options.${groupIndex}.values.${vi}.unitPrice` as const,
                  { valueAsNumber: true }
                )}
              />
            </td>
            <td className="">
              <Input
                type="number"
                step="0.01"
                className="text-right rounded-none"
                min={0}
                {...register(
                  `options.${groupIndex}.values.${vi}.totalPrice` as const,
                  { valueAsNumber: true }
                )}
              />
            </td>
            <td className="text-center bg-background">
              <DeleteIcon
                className="size-5 text-destructive ml-4 cursor-pointer"
                onClick={() => remove(vi)}
              />
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={6} className="p-1">
            <Button
              size="sm"
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
              Ajouter une ligne
            </Button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};
