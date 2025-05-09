// @/src/blocks/produits/AddProductForm.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/src/components/ui/form";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { ProductInput, ProductSchema } from "@/src/lib/validators/product.zod";
import ProductGeneralForm from "./forms/ProductGeneralForm";
import ProductPricingForm from "./forms/ProductPricingForm";
import ProductStockForm from "./forms/ProductStockForm";
import ProductMarketingForm from "./forms/ProductMarketingForm";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { useAddProductStore } from "@/src/stores/addProduct.store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CreateProductForm() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const product    = useAddProductStore(s => s.product);
  const setProduct = useAddProductStore(s => s.setProduct);
  const getProduct = useAddProductStore(s => s.getProduct);
  const resetProduct = useAddProductStore(s => s.resetProduct);
  
  const form = useForm<ProductInput>({
    resolver: zodResolver(ProductSchema),
    defaultValues: product,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  // on utilise form.reset de react-hook-form pour initialiser le form avec les valeurs du store
  // on utilise getProduct de zustand pour récupérer les valeurs du store
  useEffect(() => {
    form.reset(getProduct());
    setHydrated(true);
  }, []);

  // on utilise form.watch de react-hook-form pour mettre à jour le store à chaque changement de valeur dans le form
  // on utilise setProduct de zustand pour mettre à jour le store
  useEffect(() => {
    const sub = form.watch((values) => {
      setProduct(values as ProductInput);
    });
    return () => sub.unsubscribe();
  }, [form, setProduct]);
  

  function onSubmit(values: ProductInput) {
    console.log(values);
    // TODO: appel API pour créer le produit
    form.reset(product);
    resetProduct(); // on reset le store après la création du produit
    toast.success("Produit créé avec succès !");
    setTimeout(() => {
      router.push("/produits/catalogue"); // on redirige vers la page des produits après 2 secondes
    }, 2000);
  }

  // on utilise form.formState.errors de react-hook-form pour récupérer les erreurs du form
  const errors = form.formState.errors;
  const hasError = {
    general: !!(errors.name || errors.description || errors.categoryId),
    pricing: !!(errors.price || errors.unit || errors.options),
    stock:   !!errors.stock?.quantity,
    marketing: !!Object.keys(errors.marketing || {}).length,
  };

  if (!hydrated) return null; // on attend que le form soit initialisé avant de l'afficher

  return (
    <Card className="max-w-5xl mx-auto bg-transparent border-none mt-16">
      <CardHeader>
        <CardTitle className="text-2xl">Créer un produit</CardTitle>
        <CardDescription>
          Remplissez les informations ci-dessous pour créer un nouveau produit.
          <br />* Champs obligatoires.
          {hasError.general && <p className="text-destructive">Veuillez corriger les erreurs dans l\'onglet Général.</p>}
          {hasError.pricing && <p className="text-destructive">Veuillez corriger les erreurs dans l\'onglet Prix.</p>}
          {hasError.stock && <p className="text-destructive">Veuillez corriger les erreurs dans l\'onglet Stock.</p>}
          {hasError.marketing && <p className="text-destructive">Veuillez corriger les erreurs dans l\'onglet Marketing.</p>}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="general" className="w-full space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="general" className={`${hasError.general && "bg-destructive"}`}>Général</TabsTrigger>
                <TabsTrigger value="pricing" className={`${hasError.pricing && "bg-destructive"}`}>Prix</TabsTrigger>
                <TabsTrigger value="stock" className={`${hasError.stock && "bg-destructive"}`}>Stock</TabsTrigger>
                <TabsTrigger value="marketing" className={`${hasError.marketing && "bg-destructive"}`}>Marketing</TabsTrigger>
              </TabsList>
              <Separator />
              <TabsContent value="general">
                <ProductGeneralForm
                  form={form}
                  control={form.control}
                  register={form.register}
                  className="space-y-6"
                />
              </TabsContent>
              <TabsContent value="pricing">
                <ProductPricingForm
                  form={form}
                  control={form.control}
                  register={form.register}
                  className="space-y-6"
                />
              </TabsContent>
              <TabsContent value="stock">
                <ProductStockForm
                  form={form}
                  control={form.control}
                  register={form.register}
                  className="space-y-6"
                />
              </TabsContent>
              <TabsContent value="marketing">
                <ProductMarketingForm
                  form={form}
                  control={form.control}
                  register={form.register}
                  className="space-y-6"
                />
              </TabsContent>
            </Tabs>
            <Separator />

            <Button type="submit">Créer</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
