"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import { ArrowUpDown, Columns2Icon, Edit, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePagination } from "@/src/hooks/usePagination";
import PaginationControls from "@/src/components/custom/PaginationControl";
import { UserInput } from "@/src/lib/validators/user.zod";
import { Input } from "@/src/components/ui/input";
import ComboboxCheckbox from "@/src/components/custom/comboboxCheckbox";
import ButtonSort from "@/src/components/custom/ButtonSort";
import { Checkbox } from "@/src/components/ui/checkbox";
import { sortValues } from "@/src/utils/sortValues";

interface ClientsListProps {
  users: Partial<UserInput>[];
}

const cols = [
  { value: "name", label: "Nom" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Téléphone" },
  { value: "totalOrders", label: "Commandes" },
  { value: "totalSpent", label: "Dépensé" },
  { value: "status", label: "Statut" },
];

const PAGE_SIZE = 15;
const statusOptions = [
  { id: "active", label: "Actifs" },
  { id: "inactive", label: "Inactifs" },
  { id: "vip", label: "VIP" },
];
const priceRangeFilter = [
  { name: "0-100€", value: "0-100" },
  { name: "100-200€", value: "100-200" },
  { name: "200-300€", value: "200-300" },
  { name: "300-400€", value: "300-400" },
  { name: "400-500€", value: "400-500" },
];
const ClientsList: React.FC<ClientsListProps> = ({ users }) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedSpent, setSelectedSpent] = React.useState<string[]>([]);
  const [statusFilter, setStatusFilter] = React.useState<string[]>([]);
  const [visibleCols, setVisibleCols] = React.useState<string[]>(
    cols.map((c) => c.value).filter((c) => c !== "actions")
  );
  const [valueToSort, setValueToSort] = React.useState<string>("name");
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "asc"
  );
  const handleStatusSelect = (id: string) => {
    setStatusFilter((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };
  /**
   * @description Fonction pour gérer le changement de valeur de la barre de recherche
   * @param event
   */
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  /**
   * @description Fonction pour filtrer les produits par tranche de prix
   * @param price
   */
  const handleFilterPriceRange = (price: string) => {
    if (selectedSpent.includes(price)) {
      setSelectedSpent(selectedSpent.filter((p) => p !== price));
    } else {
      setSelectedSpent([...selectedSpent, price]);
    }
  };
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter.length === 0 ||
      statusFilter.some((f) => {
        if (f === "active") return user.isActive;
        if (f === "inactive") return !user.isActive;
        if (f === "vip") return user.isVIP;
        return true;
      });
    const matchesPrice =
      selectedSpent.length === 0 ||
      selectedSpent.some((range) => {
        // on part du principe que `range` est de la forme "0-10"
        const [min, max] = range.split("-").map(Number);
        return user.totalSpent! >= min && user.totalSpent! <= max;
      });
    return matchesSearch && matchesStatus && matchesPrice;
  });

  const sortedUsers = sortValues(
    filteredUsers,
    (u) => {
      switch (valueToSort) {
        case "name":
          return u.name || "";
        case "email":
          return u.email || "";
        case "phone":
          return u.phone || "";
        case "totalOrders":
          return u.totalOrders || 0;
        case "totalSpent":
          return u.totalSpent || 0;
        case "status":
          return u.isActive ? "Actif" : "Inactif";
        default:
          return (u as any)[valueToSort] || "";
      }
    },
    sortDirection
  );

  const {
    currentPage,
    totalPages,
    totalItems,
    pagedData,
    startItem,
    endItem,
    goToPage,
  } = usePagination(sortedUsers, PAGE_SIZE, 1);

  const toggleSort = (col: keyof UserInput) => {
    if (valueToSort === col) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setValueToSort(col as any);
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <Input
          placeholder="Rechercher clients..."
          className="max-w-100"
          onChange={handleSearchChange}
          value={searchTerm}
        />
        <ComboboxCheckbox
          options={priceRangeFilter.map((price) => price.value)}
          selectedOptions={selectedSpent}
          onSelect={(price) => handleFilterPriceRange(price)}
          placeholder="Filtrer par dépense"
          label={
            selectedSpent.length > 0
              ? `Prix : ${selectedSpent.join(", ")}`
              : "Filtrer par dépense"
          }
          icon={<Plus className="h-4 w-4" />}
        />
        <ComboboxCheckbox
          options={statusOptions.map((opt) => opt.id)}
          selectedOptions={statusFilter}
          onSelect={handleStatusSelect}
          placeholder="Filtrer statut"
          label="Statut"
          icon={<Plus className="h-4 w-4" />}
        />
        <Button
          variant="outline"
          onClick={() => {
            setSearchTerm("");
            setStatusFilter([]);
            setVisibleCols(
              cols.map((c) => c.value).filter((c) => c !== "actions")
            );
            setValueToSort("name");
            setSortDirection("asc");
          }}
        >
          Réinitialiser
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
        <TableCaption>Liste des clients</TableCaption>
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
                    toggle={() => toggleSort(col.value as keyof UserInput)}
                    isAsc={sortDirection === "asc"}
                    isActive={valueToSort === col.value}
                  />
                </TableHead>
              ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {pagedData.map((client) => (
            <TableRow key={client.id}>
              <TableHead>
                <Checkbox className="mr-2 !bg-muted-foreground/30 !border-muted-foreground" />
              </TableHead>
              <TableHead>
                <Link href={`/clients/${client.id}`} className="flex items-center gap-4">
                    <Avatar className="my-2 size-8">
                        <AvatarImage src={client?.avatar || ""} alt="User Avatar" />
                        <AvatarFallback>
                            {client?.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                  {client.name}
                </Link>
              </TableHead>
              <TableHead>{client.email}</TableHead>
              <TableHead>{client.phone}</TableHead>
              <TableHead>{client.totalOrders}</TableHead>
              <TableHead>{client.totalSpent?.toFixed(2)}</TableHead>
              <TableHead>
                {client.isActive ? "Actif" : "Inactif"}
                {client.isVIP ? " • VIP" : ""}
              </TableHead>
              <TableHead>
                <Link href={`/clients/${client.id}`}>
                  <Button variant="ghost" className="mr-2">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="ghost" className="hover:bg-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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

export default ClientsList;
