import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { UserInput } from "@/src/lib/validators/user.zod";
import React from "react";
import { ORDERS, CARTS, REVIEWS, TICKETS, MARKETINGSTATS } from "@/src/mock";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

interface UserDetailsProps {
  user: Partial<UserInput> | undefined;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  // Filtrage des données utilisateur
  const userOrders = ORDERS.filter((o) => o.userId === user?.id);
  const userCarts = CARTS.filter(
    (c) => c.userId === user?.id && c.items.length > 0
  );
  const userReviews = REVIEWS.filter((r) => r.userId === user?.id);
  const userTickets = TICKETS.filter((t) => t.userId === user?.id);
  const userMarketingStats = MARKETINGSTATS.filter((m) => m.userId === user?.id);

  // Calcul RFM
  const recency =
    userOrders.length > 0
      ? Math.floor(
          (Date.now() -
            new Date(userOrders[userOrders.length - 1].createdAt).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : null;
  const frequency = userOrders.length;
  const monetary = user?.totalSpent || 0;

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Profil & coordonnées */}
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="w-full md:w-1/3">
          <CardHeader className="flex flex-col items-center">
            <Avatar className="size-24 mb-4">
              <AvatarImage src={user?.avatar || ""} alt="User Avatar" />
              <AvatarFallback>
                {user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <CardTitle>{user?.name}</CardTitle>
            <CardDescription>{user?.email}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Separator className="my-4" />
            <p className="text-sm font-medium">
              Téléphone :{" "}
              <span className="text-muted-foreground">{user?.phone}</span>
            </p>
            <p className="text-sm font-medium">
              Adresse :{" "}
              <span className="text-muted-foreground">
                {user?.addresses?.[0]?.street},{" "}
                {user?.addresses?.[0]?.postalCode} {user?.addresses?.[0]?.city},{" "}
                {user?.addresses?.[0]?.country}
              </span>
            </p>
            {/* {user?.dateOfBirth && (
              <p className="text-sm font-medium">
                Date de naissance :{" "}
                <span className="text-muted-foreground">
                  {new Date(user.dateOfBirth).toLocaleDateString("fr-FR")}
                </span>
              </p>
            )} */}
            <p className="text-sm font-medium">
              Inscrit le :{" "}
              <span className="text-muted-foreground">
                {user?.createdAt?.toLocaleDateString("fr-FR")}
              </span>
            </p>
            <p className="text-sm font-medium">
              Dernière connexion :{" "}
              <span className="text-muted-foreground">
                {user?.lastLoginAt?.toLocaleDateString("fr-FR")}
              </span>
            </p>
            <p className="text-sm font-medium">
              Statut :{" "}
              <span className="text-muted-foreground">
                {user?.isActive ? "Actif" : "Inactif"}
              </span>
            </p>
          </CardContent>
        </Card>

        {/* Récapitulatif & RFM */}
        <Card className="w-full md:w-2/3">
          <CardHeader className="flex flex-col items-center">
            <CardTitle>Récapitulatif & RFM</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">
                Total commandes :{" "}
                <span className="text-muted-foreground">{frequency}</span>
              </p>
              <p className="text-sm font-medium">
                Montant total :{" "}
                <span className="text-muted-foreground">{monetary} €</span>
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">
                Récence (jours) :{" "}
                <span className="text-muted-foreground">
                  {recency !== null ? recency : "—"}
                </span>
              </p>
              <p className="text-sm font-medium">
                Panier moyen :{" "}
                <span className="text-muted-foreground">
                  {frequency ? (monetary / frequency).toFixed(2) : "—"} €
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Abandons de panier */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Abandons de panier</CardTitle>
        </CardHeader>
        <CardContent>
          {userCarts.length === 0 ? (
            <p className="text-center py-4">Aucun panier abandonné.</p>
          ) : (
            <p className="text-sm">
              {userCarts.length} panier(s) non finalisés.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Engagement marketing */}
      {user?.marketingOptIn && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Engagement marketing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium">
              Opt-in newsletters :{" "}
              <span className="text-muted-foreground">
                {user.marketingOptIn ? "Oui" : "Non"}
              </span>
            </p>
            <p className="text-sm font-medium">
              Taux d'ouverture email :{" "}
              <span className="text-muted-foreground">
                {userMarketingStats[0].emailOpenRate || 0}%
              </span>
            </p>
            <p className="text-sm font-medium">
              Taux de clic email :{" "}
              <span className="text-muted-foreground">
                {userMarketingStats[0].emailClickRate || 0}%
              </span>
            </p>
          </CardContent>
        </Card>
      )}

      {/* Historique des commandes */}
      <Card className="w-full">
        <CardHeader className="flex flex-col items-center">
          <CardTitle>Historique des commandes</CardTitle>
        </CardHeader>
        <CardContent>
          {userOrders.length === 0 ? (
            <p className="text-center py-4">Aucune commande pour ce client.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Commande #</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                    </TableCell>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.totalAmount} €</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Historique des avis */}
      <Card className="w-full">
        <CardHeader className="flex flex-col items-center">
          <CardTitle>Historique des avis</CardTitle>
        </CardHeader>
        <CardContent>
          {userReviews.length === 0 ? (
            <p className="text-center py-4">Aucun avis pour ce client.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Produit</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead>Commentaire</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userReviews.map((rev) => (
                  <TableRow key={rev.id}>
                    <TableCell>
                      {rev.createdAt
                        ? new Date(rev.createdAt).toLocaleDateString("fr-FR")
                        : "—"}
                    </TableCell>
                    <TableCell>{rev.productName}</TableCell>
                    <TableCell>{rev.rating}</TableCell>
                    <TableCell>{rev.comment}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Support client */}
      <Card className="w-full">
        <CardHeader className="flex flex-col items-center">
          <CardTitle>Support client</CardTitle>
        </CardHeader>
        <CardContent>
          {userTickets.length === 0 ? (
            <p className="text-center py-4">Aucun ticket ouvert.</p>
          ) : (
            <p className="text-sm">{userTickets.length} ticket(s) en cours.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetails;
