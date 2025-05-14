// @/app/%28client%29/commandes/%5Bid%5D/page.tsx
import { DashboardShell } from "@/src/blocks/dashboardBlocks/DashboardShell";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { HoverCard, HoverCardContent } from "@/src/components/ui/hover-card";
import { Progress } from "@/src/components/ui/progress";
import { Separator } from "@/src/components/ui/separator";
import {
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { ORDERS } from "@/src/mock";
import { cn } from "@/src/utils/tailwind_cn";
import { HoverCardTrigger } from "@radix-ui/react-hover-card";
import {
  BoxIcon,
  CheckCircle,
  LucideMessageSquareText,
  MapPin,
  PenSquareIcon,
  TruckIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const stepsValues = [
  { label: "pending", progressValue: 0, tagColor: "bg-primary" },
  { label: "processing", progressValue: 22, tagColor: "bg-primary" },
  { label: "shipped", progressValue: 50, tagColor: "bg-primary" },
  { label: "out_for_delivery", progressValue: 75, tagColor: "bg-primary" },
  { label: "delivered", progressValue: 100, tagColor: "bg-primary" },
];

interface OrderDetailPageProps {
  params: { id: string };
}
const OrderDetailPage: React.FC<OrderDetailPageProps> = ({ params }) => {
  const orderId = params.id; // Utiliser l'ID de la commande pour récupérer les détails de la commande
  const order = ORDERS.find((order) => order.id === orderId);
  if (!order) {
    return <div>Commande non trouvée</div>;
  }
  const progressValue =
    stepsValues.find((step) => step.label === order.shipping.status)
      ?.progressValue || 0;
  return (
    <DashboardShell>
      <section
        id="commande-details"
        className="relative flex-1 justify-between flex flex-col gap-4 p-4 w-full max-w-[1280px] mx-auto"
      >
        <div className="flex items-center gap-4">
          {/* Information du client */}
          <Card className="flex-1 self-stretch">
            <CardHeader>
              <CardTitle>
                Commande n° :
                <span className="text-sm text-muted-foreground ml-2 font-medium">
                  {order?.id}
                </span>
              </CardTitle>
              <p className="text-sm text-foreground font-bold">
                Date de la commande :
                <span className="text-sm text-muted-foreground ml-2 font-medium">
                  {order?.createdAt.toLocaleDateString("fr-FR")}
                </span>
              </p>
            </CardHeader>
            <CardContent className="relative">
              <Separator className="mb-6" />
              <div className="absolute top-6 right-4 flex gap-2">
                {/* Envoyer un message au client */}
                <HoverCard>
                  <HoverCardTrigger>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-muted hover:border hover:border-primary"
                    >
                      <LucideMessageSquareText className="size-4" />
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80" side="top">
                    <p className="text-sm text-muted-foreground">
                      Envoyer un message au client
                    </p>
                  </HoverCardContent>
                </HoverCard>
              </div>
              <h3 className="mb-2 font-bold">Information client</h3>
              <p className="text-sm text-foreground mb-2">
                Nom :
                <span className="text-muted-foreground text-sm">
                  {order?.user?.name}
                </span>
              </p>
              <p className="text-sm text-foreground mb-2">
                Email :
                <span className="text-muted-foreground text-sm">
                  {order?.user?.email}
                </span>
              </p>
              <p className="text-sm text-foreground mb-2">
                Adresse de facturation :
                <span className="text-muted-foreground text-sm">
                  {order?.billing?.address.street}{" "}
                  {order?.billing?.address.city}{" "}
                  {order?.billing?.address.postalCode}
                </span>
              </p>
              <p className="text-sm text-foreground mb-2">
                Adresse de livraison :
                <span className="text-muted-foreground text-sm">
                  {order?.shipping?.address.fullName}
                  {", "}
                  {order?.shipping?.address.street}
                  {", "}
                  {order?.shipping?.address.postalCode}{" "}
                  {order?.shipping?.address.city}
                </span>
              </p>
            </CardContent>
          </Card>
          {/* 4. Récapitulatif de la commande */}
          <Card className="flex-1 self-stretch">
            <CardHeader>
              <CardTitle>Récapitulatif de la commande</CardTitle>
            </CardHeader>
            <CardContent>
              <Separator className="mb-6" />
              <p>
                Méthode :{" "}
                <span className="text-muted-foreground">
                  {order.payment.method}
                </span>
              </p>
            </CardContent>
          </Card>
        </div>
        {/* Status de la livraison */}
        <Card className="flex-1 self-stretch">
          <CardHeader>
            <CardTitle>Livraison</CardTitle>
            <p className="text-sm">
              Transporteur :{" "}
              <span className="font-medium text-muted-foreground">
                {order.shipping.carrier}
              </span>
            </p>
            <p className="text-sm">
              Numéro de suivi :{" "}
              <span className="font-medium text-muted-foreground">
                {order.shipping.trackingNumber}
              </span>
              {order.shipping.trackingUrl && (
                <>
                  {" — "}
                  <a
                    href={order.shipping.trackingUrl}
                    target="_blank"
                    className="underline text-primary text-sm"
                  >
                    Suivre le colis
                  </a>
                </>
              )}
            </p>
          </CardHeader>
          <CardContent>
            <Separator className="mb-6" />
            <p>
              <span className="text-muted-foreground text-sm">Statut :</span>{" "}
              {order?.shipping.status}
            </p>
            {/* delivery progress */}
            <div className="relative">
              <div className="relative z-10 flex items-center justify-between w-full my-4">
                <div className="flex flex-col items-center gap-1 w-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="size-12 p-3 text-foreground bg-primary rounded-full"
                  >
                    <path d="M12 2a10 10 0 0 1 7.38 16.75" />
                    <path d="M12 6v6l4 2" />
                    <path d="M2.5 8.875a10 10 0 0 0-.5 3" />
                    <path d="M2.83 16a10 10 0 0 0 2.43 3.4" />
                    <path d="M4.636 5.235a10 10 0 0 1 .891-.857" />
                    <path d="M8.644 21.42a10 10 0 0 0 7.631-.38" />
                  </svg>
                  <p className="text-sm text-muted-foreground text-nowrap">
                    Pending
                  </p>
                </div>
                <div className="flex flex-col items-center gap-1 w-12">
                  <BoxIcon
                    className={cn(
                      "size-12 text-foreground p-3 rounded-full",
                      progressValue >= 25 ? "bg-primary" : "bg-muted-foreground"
                    )}
                  />
                  <p className="text-sm text-muted-foreground text-nowrap">
                    Processing
                  </p>
                </div>
                <div className="flex flex-col items-center gap-1 w-12">
                  <TruckIcon
                    className={cn(
                      "size-12 text-foreground p-3 rounded-full",
                      progressValue >= 50 ? "bg-primary" : "bg-muted-foreground"
                    )}
                  />
                  <p className="text-sm text-muted-foreground text-nowrap">
                    Shipped
                  </p>
                </div>
                <div className="flex flex-col items-center gap-1 w-12">
                  <MapPin
                    className={cn(
                      "size-12 text-foreground p-3 rounded-full",
                      progressValue >= 75 ? "bg-primary" : "bg-muted-foreground"
                    )}
                  />
                  <p className="text-sm text-muted-foreground text-nowrap">
                    Out for delivery
                  </p>
                </div>
                <div className="flex flex-col items-center gap-1 w-12">
                  <CheckCircle
                    className={cn(
                      "size-12 text-foreground p-3 rounded-full",
                      progressValue === 100
                        ? "bg-primary"
                        : "bg-muted-foreground"
                    )}
                  />
                  <p className="text-sm text-muted-foreground text-nowrap">
                    Delivered
                  </p>
                </div>
              </div>
              <Progress
                value={progressValue}
                max={100}
                variant="linear"
                className="absolute top-1/3 -translate-y-1/2 left-0 right-0 z-0"
              />
            </div>
          </CardContent>
          <CardContent>
            <Separator className="mb-6" />
            <CardTitle>Historique des événements</CardTitle>
            <p className="text-sm text-muted-foreground">
              Date de mise à jour :{" "}
              {order?.shipping?.shippedAt?.toLocaleDateString("fr-FR")}
            </p>
          </CardContent>
          <CardContent>
            <Separator className="mb-6" />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-foreground w-full text-start">
                    Événement
                  </TableHead>
                  <TableHead className="text-foreground w-100 text-start">
                    Date
                  </TableHead>
                  <TableHead className="text-foreground w-100 text-start">
                    Service
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order?.history.map((h) => (
                  <TableRow key={h.id}>
                    <TableHead className="w-full text-start">
                      {h.status}
                    </TableHead>
                    <TableHead className="w-100 text-start">
                      {h.timestamp.toLocaleDateString("fr-FR")}
                    </TableHead>
                    <TableHead className="w-100 text-start">
                      {h.updatedBy}
                    </TableHead>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Détails de la commande */}
        <Card className="flex-1 self-stretch">
          <CardHeader>
            <CardTitle>Détails de la commande</CardTitle>
          </CardHeader>
          <CardContent>
            <Separator className="mb-6" />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-foreground w-5/8 text-start">
                    Produit
                  </TableHead>
                  <TableHead className="text-foreground w-1/8 text-end">
                    Quantité
                  </TableHead>
                  <TableHead className="text-foreground w-1/8 text-end">
                    Prix unitaire
                  </TableHead>
                  <TableHead className="text-foreground w-1/8 text-end">
                    Prix total
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order?.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableHead className="w-5/8 text-start flex items-center gap-2">
                      <img
                        src={""}
                        alt={item.productName}
                        className="size-8 object-cover rounded bg-accent-foreground"
                      />
                      <span className="ml-2">
                        <Link
                          href={`/produits/catalogue/${item.productId}`}
                          className="text-sm text-muted-foreground"
                        >
                          {item.productName}
                        </Link>
                      </span>
                    </TableHead>
                    <TableHead className="w-1/8 text-end">
                      {item.quantity}
                    </TableHead>
                    <TableHead className="w-1/8 text-end">
                      {item.unitPrice} €
                    </TableHead>
                    <TableHead className="w-1/8 text-end">
                      {item.totalPrice} €
                    </TableHead>
                  </TableRow>
                ))}
                <TableRow className="h-4"></TableRow>
              </TableBody>
              <TableFooter className="!rounded-b-lg">
                <TableRow className="py-0">
                  <TableHead className="w-5/8 text-start leading-none h-8">
                    Sous-total
                  </TableHead>
                  <TableHead className="w-1/8 text-end leading-none h-8"></TableHead>
                  <TableHead className="w-1/8 text-end leading-none h-8"></TableHead>
                  <TableHead className="w-1/8 text-end leading-none h-8">
                    {order?.subtotal} €
                  </TableHead>
                </TableRow>
                <TableRow>
                  <TableHead className="w-5/8 text-start leading-none h-8">
                    Taxes
                  </TableHead>
                  <TableHead className="w-1/8 text-end leading-none h-8"></TableHead>
                  <TableHead className="w-1/8 text-end leading-none h-8"></TableHead>
                  <TableHead className="w-1/8 text-end leading-none h-8">
                    {order?.taxAmount} €
                  </TableHead>
                </TableRow>
                <TableRow>
                  <TableHead className="w-5/8 text-start">
                    Frais de livraison
                  </TableHead>
                  <TableHead className="w-1/8 text-end leading-none h-8"></TableHead>
                  <TableHead className="w-1/8 text-end leading-none h-8"></TableHead>
                  <TableHead className="w-1/8 text-end leading-none h-8">
                    {order?.shippingCost} €
                  </TableHead>
                </TableRow>
                {order?.shipping.insuranceStatus && (
                  <TableRow>
                    <TableHead className="w-5/8 text-start">
                      Assurance
                    </TableHead>
                    <TableHead className="w-1/8 text-end leading-none h-8"></TableHead>
                    <TableHead className="w-1/8 text-end leading-none h-8"></TableHead>
                    <TableHead className="w-1/8 text-end leading-none h-8">
                      {order.shipping.insuranceAmount} €
                    </TableHead>
                  </TableRow>
                )}
                <TableRow>
                  <TableHead className="w-5/8 text-start font-bold">
                    Total
                  </TableHead>
                  <TableHead className="w-1/8 text-end leading-none h-8"></TableHead>
                  <TableHead className="w-1/8 text-end leading-none h-8"></TableHead>
                  <TableHead className="w-1/8 text-end font-bold leading-none h-8">
                    {order?.totalAmount} €
                  </TableHead>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      </section>
    </DashboardShell>
  );
};

export default OrderDetailPage;
