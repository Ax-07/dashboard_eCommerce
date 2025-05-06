// @/src/blocks/produits/AddcategoryForm.tsx
"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Plus } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/src/components/ui/hover-card";

// Schéma Zod pour la création de catégorie
const CreateCategorySchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }),
  description: z.string().optional(),
});

type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;
interface AddCategoryProps {
  className?: string;
}
export const AddCategory: React.FC<AddCategoryProps> = ({ className }) => {
  const form = useForm<CreateCategoryInput>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: { name: "", description: "" },
  });

  async function onSubmit(data: CreateCategoryInput) {
      try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok)
        throw new Error("Erreur lors de la création de la catégorie");
      await res.json();
      form.reset();
      toast.success("Catégorie créée avec succès");
      // TODO: afficher un toast ou notifier le parent
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la création de la catégorie");
      // TODO: gérer l'affichage d'erreur
    }
  }

  return (
    <div onClick={(e) => e.stopPropagation()} className={className}>
        <Form {...form} >
          <form className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Accessoires" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description (optionnelle) */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description (optionnelle)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="button" onClick={form.handleSubmit(onSubmit)} className="w-full">
              Créer la catégorie
            </Button>
          </form>
        </Form>
    </div>
  );
};

export const BtnAddCategory = () => {
    const [hoverOpen, setHoverOpen] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
  
    const handleHoverChange = (open: boolean) => {
      if (!dialogOpen) {
        setHoverOpen(open)
      } else {
        // s'assure que le tooltip ne réapparaît pas quand le dialog est ouvert
        setHoverOpen(false)
      }
    }
  
    return (
        <>
          {/* Tooltip autour du bouton */}
          <HoverCard open={hoverOpen} onOpenChange={handleHoverChange} openDelay={100} closeDelay={0}>
            <HoverCardTrigger asChild>
              {/* Bouton déclenche modal au clic */}
              <Button
              type="button"
                variant="ghost"
                className="border"
                onClick={(e) => { e.stopPropagation(); setDialogOpen(true); }}
                >
                <Plus className="size-4" />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>
                <p className="text-sm text-muted-foreground">
                  Créez une nouvelle catégorie pour vos produits.
                </p>
            </HoverCardContent>
          </HoverCard>
    
          {/* Modale de création */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="text-center">
                    <DialogTitle>Créer une nouvelle catégorie</DialogTitle>
                    <DialogDescription>
                    Remplissez les informations ci-dessous pour créer une nouvelle
                    catégorie.
                    </DialogDescription>
                </DialogHeader>
              <AddCategory className="border-none" />
            </DialogContent>
          </Dialog>
        </>
      )
    }