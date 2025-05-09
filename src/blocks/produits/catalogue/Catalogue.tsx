// @/src/blocks/produits/catalogue/Catalogue.tsx
"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import React from "react";
import { Columns2Icon, PenBox, Plus, Trash2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import ComboboxCheckbox from "@/src/components/custom/comboboxCheckbox";
import SearchInput from "@/src/components/ui/input-search";
import { Star } from "@/src/components/ui/rating";
import { PRODUCTS } from "@/src/mock";
import { sortValues } from "@/src/utils/sortValues";
import ButtonSort from "@/src/components/custom/ButtonSort";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";

// const cols = [
//   "SKU", // Stock Keeping Unit, un identifiant unique pour chaque produit.
//   "Nom", // Nom du produit
//   "Prix / Unités", // Prix par unité
//   "Catégorie", // Catégorie du produit
//   "Stock", // Quantité disponible en stock
//   "Rating", // Note ou évaluation du produit
//   "Status", // Statut du produit (disponible, en rupture de stock, etc.)
//   "", // Actions possibles (modifier, supprimer, etc.)
// ];

const cols = [
  { name: "SKU", value: "id" },
  { name: "Nom", value: "name" },
  { name: "Prix / Unités", value: "price" },
  { name: "Catégorie", value: "category" },
  { name: "Stock", value: "stock" },
  { name: "Rating", value: "rating" },
  { name: "Status", value: "status" },
  { name: "", value: "actions" },
];

const statusFilter = [
  { name: "Tous", value: "" },
  { name: "Disponible", value: "available" },
  { name: "Rupture de stock", value: "out_of_stock" },
  { name: "Discontinué", value: "discontinued" },
];
const categoryFilter = [
  { name: "Fleurs", value: "flowers" },
  { name: "Huiles", value: "oils" },
  { name: "Résines", value: "resins" },
  { name: "E-liquides", value: "e-liquids" },
];
const priceRangeFilter = [
  { name: "0-10€", value: "0-10" },
  { name: "10-20€", value: "10-20" },
  { name: "20-30€", value: "20-30" },
  { name: "30-40€", value: "30-40" },
  { name: "40-50€", value: "40-50" },
];
const PAGE_SIZE = 15;

const Catalogue = () => {
  const [selectedStatus, setSelectedStatus] = React.useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = React.useState<string[]>([]);
  const [visibleCols, setVisibleCols] = React.useState<string[]>(
    cols.map((c) => c.value)
  );
  const [valueToSort, setValueToSort] = React.useState<
    "name" | "price" | "category" | "stock" | "rating" | "status"
  >("name");
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleStatusChange = (status: string) => {
    if (selectedStatus.includes(status)) {
      setSelectedStatus(selectedStatus.filter((s) => s !== status));
    } else {
      setSelectedStatus([...selectedStatus, status]);
    }
  };
  const handleCategoryChange = (category: string) => {
    if (selectedCategory.includes(category)) {
      setSelectedCategory(selectedCategory.filter((c) => c !== category));
    } else {
      setSelectedCategory([...selectedCategory, category]);
    }
  };
  const handlePriceChange = (price: string) => {
    if (selectedPrice.includes(price)) {
      setSelectedPrice(selectedPrice.filter((p) => p !== price));
    } else {
      setSelectedPrice([...selectedPrice, price]);
    }
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const filteredProducts = PRODUCTS.filter((product) => {
    // const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(product.status);
    const matchesCategory =
      selectedCategory.length === 0 ||
      selectedCategory.includes(product.category?.name || "");
    const matchesPrice =
      selectedPrice.length === 0 ||
      selectedPrice.some((range) => {
        // on part du principe que `range` est de la forme "0-10"
        const [min, max] = range.split("-").map(Number);
        return product.price! >= min && product.price! <= max;
      });
    const matchesSearchTerm = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return (
      // matchesStatus &&
      matchesCategory && matchesSearchTerm && matchesPrice
    );
  });
  const sortedProducts = sortValues(
    filteredProducts,
    (p) => {
      switch (valueToSort) {
        case "category":
          return p.category?.name;
        case "stock":
          return p.stock?.quantity;
        case "rating":
          return p.reviewSummary?.averageRating;
        default:
          return (p as any)[valueToSort];
      }
    },
    sortOrder
  );

  // pagination logic
  const totalItems = sortedProducts.length;
  const totalPages = Math.ceil(sortedProducts.length / PAGE_SIZE);
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const pagedProducts = sortedProducts.slice(startIdx, startIdx + PAGE_SIZE);
  const startItem = startIdx + 1;
  const endItem = Math.min(startIdx + pagedProducts.length, totalItems);

  return (
    <section className="relative flex-1 justify-between flex flex-col p-4">
      {/* Recherche et Filtre */}
      <div>
      <div className="flex items-center mb-4 space-x-2">
        <SearchInput
          placeholder="Rechercher un produit"
          className="max-w-100"
          onChange={handleSearchChange}
          value={searchTerm}
        />
        <ComboboxCheckbox
          options={statusFilter.map((status) => status.name)}
          selectedOptions={selectedStatus}
          onSelect={(status) => handleStatusChange(status)}
          placeholder="Filtrer par statut"
          label="Statut"
          icon={<Plus className="h-4 w-4" />}
        />
        <ComboboxCheckbox
          options={categoryFilter.map((category) => category.name)}
          selectedOptions={selectedCategory}
          onSelect={(category) => handleCategoryChange(category)}
          placeholder="Filtrer par catégorie"
          label="Catégorie"
          icon={<Plus className="h-4 w-4" />}
        />
        <ComboboxCheckbox
          options={priceRangeFilter.map((price) => price.value)}
          selectedOptions={selectedPrice}
          onSelect={(price) => handlePriceChange(price)}
          placeholder="Filtrer par prix"
          label={
            selectedPrice.length > 0
              ? `Prix : ${selectedPrice.join(", ")}`
              : "Filtrer par prix"
          }
          icon={<Plus className="h-4 w-4" />}
        />
        <Button
          variant="outline"
          className=""
          onClick={() => {
            setSelectedStatus([]);
            setSelectedCategory([]);
            setSelectedPrice([]);
            setSearchTerm("");
            setVisibleCols(cols.map((col) => col.value));
          }}
        >
          Réinitialiser les filtres
        </Button>
        <Button variant="outline" className="ml-auto">
          <Plus className="h-4 w-4" />
          Ajouter un produit
        </Button>
        <ComboboxCheckbox
          options={cols.map((col) => col.value)}
          selectedOptions={visibleCols}
          onSelect={(col) => {
            if (visibleCols.includes(col)) {
              setVisibleCols(visibleCols.filter((c) => c !== col));
            } else {
              setVisibleCols([...visibleCols, col]);
            }
          }}
          icon={<Columns2Icon className="h-4 w-4" />}
        />
      </div>
      <Table>
        <TableCaption>Catalogue des produits disponibles</TableCaption>
        <TableHeader className="">
          <TableRow>
            <TableHead className="bg-muted/50">
              <Checkbox className="mr-2 !bg-muted-foreground/30 !border-muted-foreground" />
            </TableHead>
            {cols
              .filter((col) => visibleCols.includes(col.value))
              .filter((col) => col.value !== "actions")
              .map((col, index) => (
                <TableHead
                  key={index}
                  className="bg-muted/50 text-left font-bold text-foreground"
                >
                  {col.name}
                  <ButtonSort
                    toggle={() => {
                      if (valueToSort === col.value) {
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      } else {
                        setValueToSort(col.value as any);
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      }
                    }}
                    isAsc={sortOrder === "asc"}
                    isActive={valueToSort === col.value}
                  />
                </TableHead>
              ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {pagedProducts.map((product, index) => (
            <TableRow key={index} className="">
              <TableHead className="">
                <Checkbox className="mr-2" />
              </TableHead>
              {cols
                .filter((col) => visibleCols.includes(col.value))
                .map((col, index) => {
                  switch (col.value) {
                    case "id":
                      return <TableHead key={index}>{product.id}</TableHead>;
                    case "name":
                      return <TableHead key={index}>{product.name}</TableHead>;
                    case "price":
                      return (
                        <TableHead key={index}>
                          {product.price} € / {product.unit}
                        </TableHead>
                      );
                    case "category":
                      return (
                        <TableHead key={index}>
                          {product.category?.name}
                        </TableHead>
                      );
                    case "stock":
                      return (
                        <TableHead key={index}>
                          {product.stock?.quantity}
                        </TableHead>
                      );
                    case "rating":
                      return (
                        <TableHead key={index} className="flex items-center">
                          <span className="text-yellow-400 mr-2">
                            <Star className="h-4 w-4" filled />
                          </span>
                          <span className="">
                            {product.reviewSummary?.averageRating}
                          </span>
                        </TableHead>
                      );
                    case "status":
                      return (
                        <TableHead key={index}>{product.status}</TableHead>
                      );
                    default:
                      return null;
                  }
                })}
              <TableHead className="">
                <Button variant="ghost" className="mr-2">
                  <PenBox className="h-4 w-4" />
                </Button>
                <Button variant="ghost" className="mr-2 hover:bg-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
      <Pagination className="flex flex-col items-center justify-between mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage((p) => Math.max(1, p - 1));
              }}
            />
          </PaginationItem>

          {/*
            Affiche toujours :
            - la première page,
            - une ellipse si on est loin
            - les pages autour de currentPage
            - une ellipse si on est loin de la fin
            - la dernière page
          */}
          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            // on ne rend que les pages 1, last, et celles à ±1 de la courante
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page);
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            }
            // insérer une ellipse une seule fois
            if (
              (page === currentPage - 2 && currentPage > 3) ||
              (page === currentPage + 2 && currentPage < totalPages - 2)
            ) {
              return (
                <PaginationItem key={`ellipsis-${page}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            return null;
          })}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage((p) => Math.min(totalPages, p + 1));
              }}
            />
          </PaginationItem>
        </PaginationContent>
        <PaginationContent>
          <span className="text-muted-foreground">
            {startItem} - {endItem} de {totalItems} produits
          </span>
        </PaginationContent>
      </Pagination>
    </section>
  );
};

export default Catalogue;
