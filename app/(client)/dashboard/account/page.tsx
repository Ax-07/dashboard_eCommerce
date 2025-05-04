import { LogoutButton } from '@/src/components/auth/AuthButtons';
import { Button } from '@/src/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/card';
import { Input } from '@/src/components/ui/input';
import { TableBody, TableRow, TableCell } from '@/src/components/ui/table';
import { Label } from '@/src/components/ui/label';
import { Table } from 'lucide-react';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar';
import UserLayout from '../layout';
import { getAuthSession } from '@/src/lib/auth/auth.config';

const userAccountPage = async () => {
    const session = await getAuthSession(); 

    return (
      // <UserLayout>
        <section className="flex flex-col items-center py-16 w-full">
          <div className="container max-w-3xl">
            {/* ✅ Avatar + Infos */}
            <Card className="flex flex-col items-center p-6">
              <Avatar className="size-24">
                <AvatarImage
                  src={session?.user?.image || "/images/Default-user-picture.png"}
                  alt={`Photo de ${session?.user?.name}`}
                />
                <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
    
              <h1 className="mt-4 text-2xl font-bold">
                {session?.user?.name || "Utilisateur inconnu"}
              </h1>
              <p className="text-gray-500">{session?.user?.email}</p>
            </Card>
    
            {/* ✅ Informations utilisateur */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Informations du compte</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Nom</TableCell>
                      <TableCell>{session?.user?.name || "Non défini"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Email</TableCell>
                      <TableCell>{session?.user?.email || "Non défini"}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
    
            {/* ✅ Formulaire de modification */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Modifier les informations</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nom</Label>
                    <Input id="name" type="text" placeholder="Votre nouveau nom" defaultValue={session?.user?.name || ""} />
                  </div>
    
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Votre nouvel email" defaultValue={session?.user?.email || ""} />
                  </div>
    
                  <Button type="submit" className="w-full mt-2">
                    Mettre à jour
                  </Button>
                </form>
              </CardContent>
            </Card>
    
            {/* ✅ Changer le mot de passe */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Changer de mot de passe</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="current-password">Mot de passe actuel</Label>
                    <Input id="current-password" type="password" placeholder="Votre mot de passe actuel" />
                  </div>
    
                  <div>
                    <Label htmlFor="new-password">Nouveau mot de passe</Label>
                    <Input id="new-password" type="password" placeholder="Votre nouveau mot de passe" />
                  </div>
    
                  <Button type="submit" className="w-full mt-2">
                    Changer le mot de passe
                  </Button>
                </form>
              </CardContent>
            </Card>
    
            {/* ✅ Bouton de suppression de compte */}
            <div className="mt-6 flex flex-col items-center">
              <Button variant="destructive" className="w-full">
                Supprimer mon compte
              </Button>
    
              <div className="mt-4">
                <LogoutButton />
              </div>
            </div>
          </div>
        </section>
      // </UserLayout>
    );
  }

export default userAccountPage;