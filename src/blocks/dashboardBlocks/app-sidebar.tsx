"use client";

import * as React from "react";
import {
  Home,
  ShoppingCart,
  Box,
  Users,
  BarChart2,
  FileText,
  ChartNoAxesColumn,
  Tag,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from "@/src/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

// Structure de navigation pour le site e-commerce
const data = {
  navMain: [
    {
      group: "Tableau de bord",
      items: [
        {
          title: "Vue d'ensemble", // Vue d'ensemble du tableau de bord
          url: "/",
          icon: Home,
        },
        {
          title: "Commandes", // Gestion des commandes
          url: "/commandes",
          icon: ShoppingCart,
          items: [
            { title: "Voir toutes les commandes", url: "/commandes" }, // Lien vers toutes les commandes
            { title: "En attente", url: "/commandes/attente" }, // Commandes en attente
            { title: "Expédiées", url: "/commandes/expediees" }, // Commandes expédiées
            { title: "Livrées", url: "/commandes/livrees" }, // Commandes livrées
            { title: "Annulées", url: "/commandes/annulees" }, // Commandes annulées
            { title: "Retours", url: "/commandes/retours" }, // Commandes retournées
            { title: "Remboursées", url: "/commandes/remboursees" }, // Commandes remboursées
          ],
        },
        {
          title: "Ventes", // Analyse des ventes
          url: "/ventes",
          icon: ChartNoAxesColumn,
          items: [
            { title: "Chiffre d'affaires", url: "/ventes/chiffre-d-affaires" }, // Chiffre d'affaires
            { title: "Panier moyen", url: "/ventes/panier-moyen" }, // Panier moyen
            { title: "Taux de conversion", url: "/ventes/taux-de-conversion" }, // Taux de conversion
            {
              title: "Produits les plus vendus",
              url: "/ventes/produits-les-plus-vendus",
            }, // Produits les plus vendus
            {
              title: "Produits les moins vendus",
              url: "/ventes/produits-les-moins-vendus",
            }, // Produits les moins vendus
          ],
        },
        {
          title: "Produits", // Gestion des produits
          url: "/produits",
          icon: Box,
          items: [
            { title: "Ajouter un produit", url: "/produits/ajouter" }, // Ajouter un nouveau produit
            { title: "Catalogue", url: "/produits/catalogue" }, // Lien vers le catalogue
            { title: "Inventaire", url: "/produits/inventaire" }, // Gestion de l'inventaire
            { title: "Collections", url: "/produits/collections" }, // Gestion des collections
            { title: "Produits en rupture", url: "/produits/rupture" }, // Produits en rupture de stock
            { title: "Produits en promotion", url: "/produits/promotion" }, // Produits en promotion
          ],
        },
        {
          title: "Clients", // Gestion des clients
          url: "/clients",
          icon: Users,
          items: [
            { title: "Liste des clients", url: "/clients" }, // Lien vers la liste des clients
            { title: "Avis clients", url: "/clients/avis" }, // Avis des clients
            { title: "Abonnés à la newsletter", url: "/clients/newsletter" }, // Clients abonnés à la newsletter
            { title: "Segments", url: "/clients/segments" }, // Segmentation des clients
          ],
        },
        {
          title: "Trafic & Marketing", // Analyse du trafic et marketing
          url: "/marketing",
          icon: BarChart2,
          items: [
            { title: "Sources de trafic", url: "/marketing/trafic" }, // Sources de trafic
            { title: "Campagnes & promos", url: "/marketing/campagnes" }, // Campagnes et promotions
          ],
        },
        {
          title: "Rapports & exports", // Rapports et exports
          url: "/rapports",
          icon: FileText,
          items: [
            { title: "Rapports personnalisés", url: "/rapports" }, // Lien vers les rapports personnalisés
            { title: "Export CSV/PDF", url: "/rapports/export" }, // Exportation au format CSV ou PDF
            { title: "Historique des exports", url: "/rapports/historique" }, // Historique des exports
          ],
        },
      ],
    },
    {
      group: "Accès rapide",
      items: [
        {
          title: "Créer un produit", // Créer un nouveau produit
          url: "/produits/ajouter",
          icon: Box,
        },
        {
          title: "Créer une promotion", // Créer une nouvelle promotion
          url: "/promotions/creer",
          icon: Tag,
        },
      ],
    }
  ],
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/">
              <SidebarMenuButton
                size="lg"
                className="cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-background text-sidebar-primary-foreground">
                  <Image
                    src={"/images/Frame 1668.png"}
                    width={32}
                    height={32}
                    className="size-auto"
                    alt={"Logo de l'application"}
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Ardèche</span>
                  <span className="truncate text-xs">Web 07</span>
                </div>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain groups={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
