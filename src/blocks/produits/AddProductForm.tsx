// @/src/blocks/produits/AddProductForm.tsx
"use client"

import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/src/components/ui/form'
import { Input } from '@/src/components/ui/input'
import { Textarea } from '@/src/components/ui/textarea'
import { Button } from '@/src/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Separator } from '@/src/components/ui/separator'
import { Checkbox } from '@/src/components/ui/checkbox'
import Combobox from '@/src/components/custom/combobox'
import { BtnAddCategory } from './forms/AddcategoryForm'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select'
import { Switch } from '@/src/components/ui/switch'
import { ProductInput, ProductSchema } from '@/src/lib/validators/product.zod'
import ProductGeneralForm from './forms/ProductGeneralForm'
import ProductPricingForm from './forms/ProductPricingForm'
import ProductStockForm from './forms/ProductStockForm'
import ProductMarketingForm from './forms/ProductMarketingForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui/tabs'

export default function CreateProductForm() {
  const form = useForm<ProductInput>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      unit: 'g',
      unitPrice: 0,
      categoryId: undefined,
      subCategoryId: undefined,
      options: [],
      media: [],
      promotion: { 
        isOnSale: false,
        discountPercentage: 0
      },
      stock: { quantity: 0 },
      marketing: {
        isFeatured: false,
        isBestSeller: false,
        isLimitedEdition: false,
        isNew: false,
        isPopular: false,
        isTrending: false,
      },
    },
    mode: 'onSubmit',
  })

  const { fields: optionFields, append: addOption, remove: removeOption } = useFieldArray({
    name: 'options', control: form.control,
  })

  function onSubmit(values: ProductInput) {
    console.log(values)
    // TODO: appel API pour créer le produit
  }

  return (
    <Card className="max-w-3xl mx-auto bg-transparent border-none mt-16">
      <CardHeader>
        <CardTitle className='text-2xl'>Créer un produit</CardTitle>
        <CardDescription>
          Remplissez les informations ci-dessous pour créer un nouveau produit.
          <br />
          * Champs obligatoires.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="general" className="w-full space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="general">Général</TabsTrigger>
                <TabsTrigger value="pricing">Prix</TabsTrigger>
                <TabsTrigger value="stock">Stock</TabsTrigger>
                <TabsTrigger value="marketing">Marketing</TabsTrigger>
              </TabsList>
              <Separator />
              <TabsContent value="general">
                <ProductGeneralForm control={form.control} register={form.register} className="space-y-6" />
              </TabsContent>
              <TabsContent value="pricing">
                <ProductPricingForm form={form} control={form.control} register={form.register} className="space-y-6" />
              </TabsContent>
              <TabsContent value="stock">
                <ProductStockForm form={form} control={form.control} register={form.register} className="space-y-6" />
              </TabsContent>
              <TabsContent value="marketing">
                <ProductMarketingForm form={form} control={form.control} register={form.register} className="space-y-6" />
              </TabsContent>
            </Tabs>
            <Separator />

            <Button type="submit">Créer</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
};