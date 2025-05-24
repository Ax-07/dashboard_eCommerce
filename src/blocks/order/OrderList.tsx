"use client";
import React from "react";

import ButtonSort from "@/src/components/custom/ButtonSort";
import ComboboxCheckbox from "@/src/components/custom/comboboxCheckbox";
import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { sortValues } from "@/src/utils/sortValues";
import { Columns2Icon, PenBox, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePagination } from "@/src/hooks/usePagination";
import PaginationControls from "@/src/components/custom/PaginationControl";
import ComboSearchInput from "@/src/components/custom/comboSearchInput";
import { OrderInput } from "@/src/lib/validators/order.zod";

const cols = [
  { value: "id", label: "ID" },
  { value: "produit", label: "Produit" },
  { value: "montant", label: "Montant" },
  { value: "client", label: "Client" },
  { value: "date", label: "Date" },
  { value: "type", label: "Type" },
  { value: "status", label: "Status" },
];
const statusFilter = [
  { id: "all", label: "Tous" },
  { id: "pending", label: "En attente" },
  { id: "paid", label: "Payé" },
  { id: "processing", label: "En cours de traitement" },
  { id: "shipped", label: "Expédié" },
  { id: "delivered", label: "Livré" },
  { id: "canceled", label: "Annulé" },
  { id: "completed", label: "Terminé" },
  { id: "refunded", label: "Remboursé" },
  { id: "return_requested", label: "Retour demandé" },
  { id: "return_approved", label: "Retour approuvé" },
];
const priceRangeFilter = [
  { name: "0-50€", value: "0-50" },
  { name: "50-100€", value: "50-100" },
  { name: "100-250€", value: "100-250" },
  { name: "250-500€", value: "250-500" },
  { name: "500-1000€", value: "500-1000" },
];
const typeFilter = [
  { id: "all", label: "Tous" },
  { id: "standard", label: "Standard" },
  { id: "subscription", label: "Abonnement" },
  { id: "sale", label: "Vente" },
  { id: "flash_sale", label: "Vente flash" },
  { id: "pre_order", label: "Précommande" },
  { id: "back_order", label: "Commande en attente" },
  { id: "return", label: "Retour" },
];
const dateFilter = [
  { id: "today", label: "Aujourd'hui" },
  { id: "this_week", label: "Cette semaine" },
  { id: "this_month", label: "Ce mois-ci" },
  { id: "last_month", label: "Le mois dernier" },
  { id: "last_year", label: "L'année dernière" },
];
const PAGE_SIZE = 15;

interface OrderListProps {
  orders: OrderInput[];
}
const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  const [selectedPrice, setSelectedPrice] = React.useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = React.useState<string[]>([]);
  const [selectedDate, setSelectedDate] = React.useState<string[]>([]);
  const [selectedType, setSelectedType] = React.useState<string[]>([]);
  const [colToSearch, setColToSearch] = React.useState<string>("id");
  const [visibleCols, setVisibleCols] = React.useState<string[]>(
    cols.map((c) => c.value).filter((c) => c !== "actions")
  );
  const [colToSort, setColToSort] = React.useState<
    "id" | "produit" | "montant" | "client" | "date" | "type" | "status"
  >("id");
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "asc"
  );
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  /**
   * @description Fonction pour filtrer les produits par tranche de prix
   * @param price
   */
  const handleFilterPriceRange = (price: string) => {
    if (selectedPrice.includes(price)) {
      setSelectedPrice(selectedPrice.filter((p) => p !== price));
    } else {
      setSelectedPrice([...selectedPrice, price]);
    }
  };
  const handleFilterStatus = (status: string) => {
    if (selectedStatus.includes(status)) {
      setSelectedStatus(selectedStatus.filter((s) => s !== status));
    } else {
      setSelectedStatus([...selectedStatus, status]);
    }
  };
  const handleFilterDate = (filterId: string) => {
    if (selectedDate.includes(filterId)) {
      setSelectedDate(selectedDate.filter((f) => f !== filterId));
    } else {
      setSelectedDate([...selectedDate, filterId]);
    }
  };
  const handleFilterType = (type: string) => {
    if (selectedType.includes(type)) {
      setSelectedType(selectedType.filter((t) => t !== type));
    } else {
      setSelectedType([...selectedType, type]);
    }
  };
  const handleSearchTerm = (term: string) => {
    setSearchTerm(term);
  };

  const filteredOrder = orders.filter((o) => {
    // Extraction propre de la colonne à chercher
    const fieldValue = (() => {
      switch (colToSearch) {
        case "id":
          return o.id;
        case "produit":
          return o.items[0]?.productName ?? "";
        case "montant":
          return o.totalAmount.toString();
        case "client":
          return [o.customer?.firstName, o.customer?.lastName]
            .filter(Boolean)
            .join(" ");
        case "date":
          return o.createdAt.toLocaleDateString("fr-FR");
        case "type":
          return o.type;
        case "status":
          return o.status;
        default:
          return "";
      }
    })();
    const matchesStatus =
      selectedStatus.length === 0 || selectedStatus.includes(o.status);
    const matchesDate =
      selectedDate.length === 0 ||
      selectedDate.some((filterId) => {
        const now = new Date();
        let start: Date, end: Date;

        switch (filterId) {
          case "today":
            start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            end = new Date(start);
            end.setDate(end.getDate() + 1);
            break;

          case "this_week":
            // semaine commençant lundi
            start = new Date(now);
            start.setDate(
              now.getDate() - ((now.getDay() + 6) % 7) // 0=dimanche -> lundi = -6
            );
            start.setHours(0, 0, 0, 0);
            end = new Date(start);
            end.setDate(start.getDate() + 7);
            break;

          case "this_month":
            start = new Date(now.getFullYear(), now.getMonth(), 1);
            end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
            break;

          case "last_month":
            start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            end = new Date(now.getFullYear(), now.getMonth(), 1);
            break;

          case "last_year":
            start = new Date(now.getFullYear() - 1, 0, 1);
            end = new Date(now.getFullYear(), 0, 1);
            break;

          default:
            return true; // sécurité
        }

        return o.createdAt >= start && o.createdAt < end;
      });
    const matchesType =
      selectedType.length === 0 || selectedType.includes(o.type);
    const matchesPrice =
      selectedPrice.length === 0 ||
      selectedPrice.some((range) => {
        const [min, max] = range.split("-").map(Number);
        // Ici on inclut min ≤ montant < max
        return o.totalAmount >= min && o.totalAmount < max;
      });
    const matchesSearchTerm =
      searchTerm === "" ||
      fieldValue.toLowerCase().includes(searchTerm.toLowerCase());

    return (
      matchesStatus &&
      matchesDate &&
      matchesType &&
      matchesPrice &&
      matchesSearchTerm
    );
  });

  const sortedOrder = sortValues(
    filteredOrder,
    (o) => {
      switch (colToSort) {
        case "id":
          return o.id;
        case "produit":
          return o.items[0]?.productName ?? "";
        case "montant":
          return o.totalAmount;
        case "client":
          return o.customer?.lastName ?? "";
        case "date":
          return o.createdAt;
        case "type":
          return o.type;
        case "status":
          return o.status;
        default:
          return o.id;
      }
    },
    sortDirection
  );
  const {
    currentPage,
    totalPages,
    totalItems,
    pagedData, // remplace pagedProducts
    startItem,
    endItem,
    goToPage,
  } = usePagination(sortedOrder, PAGE_SIZE, 1);
  return (
    <div>
      {/* Recherche et Filtre */}
      <div>
        <div className="flex items-center mb-4 space-x-2">
          <ComboSearchInput
            columns={cols}
            selectedColumn={colToSearch}
            onColumnChange={setColToSearch}
            searchValue={searchTerm}
            onSearchChange={handleSearchTerm}
            placeholder="Rechercher dans la colonne…"
          />
          <ComboboxCheckbox
            options={statusFilter.map((status) => status.id)}
            selectedOptions={selectedStatus}
            onSelect={(status) => handleFilterStatus(status)}
            placeholder="Filtrer par status"
            label="Status"
            icon={<Plus className="h-4 w-4" />}
          />
          <ComboboxCheckbox
            options={typeFilter.map((type) => type.id)}
            selectedOptions={selectedType}
            onSelect={(type) => handleFilterType(type)}
            placeholder="Filtrer par type"
            label="Type"
            icon={<Plus className="h-4 w-4" />}
          />
          <ComboboxCheckbox
            options={dateFilter.map((date) => date.id)}
            selectedOptions={selectedDate}
            onSelect={(date) => handleFilterDate(date)}
            placeholder="Filtrer par date"
            label="Date"
            icon={<Plus className="h-4 w-4" />}
          />
          <ComboboxCheckbox
            options={priceRangeFilter.map((price) => price.value)}
            selectedOptions={selectedPrice}
            onSelect={(price) => handleFilterPriceRange(price)}
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
              setSelectedPrice([]);
              setSelectedDate([]);
              setSelectedType([]);
              setSearchTerm("");
              setVisibleCols(cols.map((col) => col.value));
            }}
          >
            Réinitialiser les filtres
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
            variant={"outline"}
            size={"icon"}
            className="ml-auto"
          />
        </div>
        <Table>
          <TableCaption>Liste des commandes</TableCaption>
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
                    {col.label}
                    <ButtonSort
                      toggle={() => {
                        if (colToSort === col.value) {
                          setSortDirection(
                            sortDirection === "asc" ? "desc" : "asc"
                          );
                        } else {
                          setColToSort(col.value as any);
                          setSortDirection(
                            sortDirection === "asc" ? "desc" : "asc"
                          );
                        }
                      }}
                      isAsc={sortDirection === "asc"}
                      isActive={colToSort === col.value}
                    />
                  </TableHead>
                ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagedData.map((order, index) => (
              <TableRow key={index} className="">
                <TableHead className="">
                  <Checkbox className="mr-2" />
                </TableHead>
                {cols
                  .filter((col) => visibleCols.includes(col.value))
                  .map((col, index) => {
                    switch (col.value) {
                      case "id":
                        return (
                          <TableHead key={index}>
                            <Link href={`/commandes/${order.id}`}>
                              {order.id}
                            </Link>
                          </TableHead>
                        );
                      case "produit":
                        return (
                          <TableHead key={index}>
                            <Link href={`/commandes/${order.id}`}>
                              {order.items[0]?.productName}
                            </Link>
                          </TableHead>
                        );
                      case "montant":
                        return (
                          <TableHead key={index}>{order.totalAmount}</TableHead>
                        );
                      case "client":
                        return (
                          <TableHead key={index}>
                            {order.customer?.firstName}{" "}
                            {order.customer?.lastName}
                          </TableHead>
                        );
                      case "date":
                        return (
                          <TableHead key={index}>
                            {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                          </TableHead>
                        );
                      case "type":
                        return (
                          <TableHead key={index} className="flex items-center">
                            <span className="">{order.type}</span>
                          </TableHead>
                        );
                      case "status":
                        return (
                          <TableHead key={index}>
                            <span className="">{order.status}</span>
                          </TableHead>
                        );
                      default:
                        return null;
                    }
                  })}
                <TableHead className="">
                  <Link href={`/commandes/${order.id}`}>
                    <Button variant="ghost" className="mr-2">
                      <PenBox className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" className="mr-2 hover:bg-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableHead>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        startItem={startItem}
        endItem={endItem}
        totalItems={totalItems}
        onPageChange={goToPage}
      />
    </div>
  );
};

export default OrderList;
