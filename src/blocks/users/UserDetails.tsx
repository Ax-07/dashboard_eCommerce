import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Separator } from '@/src/components/ui/separator';
import { UserInput } from '@/src/lib/validators/user.zod';
import React from 'react';
interface UserDetailsProps {
    user: Partial<UserInput> | undefined;
}
const UserDetails: React.FC<UserDetailsProps> = ({user}) => {
    return (
        <div>
            <Card className="p-4">
                <CardHeader>
                    <Avatar>
                        <AvatarImage src={user?.avatar || ""} alt="User Avatar" />
                        <AvatarFallback>
                            {user?.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <CardTitle>
                        {user?.name}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Separator />
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold">Détails de l'utilisateur</h2>
                        <p><strong>Email:</strong> {user?.email}</p>
                        <p><strong>Téléphone:</strong> {user?.phone}</p>
                        <p><strong>Total des commandes:</strong> {user?.totalOrders}</p>
                        <p><strong>Total dépensé:</strong> {user?.totalSpent}€</p>
                    </div>
                    <Separator className="my-4" />

                </CardContent>
            </Card>
        </div>
    );
};

export default UserDetails;