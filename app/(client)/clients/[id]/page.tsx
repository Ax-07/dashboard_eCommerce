// @/app/%28client%29/clients/%5Bid%5D/page.tsx

import { DashboardShell } from '@/src/blocks/dashboardBlocks/DashboardShell';
import UserDetails from '@/src/blocks/users/UserDetails';
import { UserMock } from '@/src/mock/client.mock';
import React from 'react';

interface ClientByIdPageProps {
    params: { id: string };
}

const ClientByIdPage: React.FC<ClientByIdPageProps> = ({params}) => {
    const userId = params.id; // Utiliser l'ID du client pour récupérer les détails du client
        const user = UserMock.find((user) => user.id === userId); // Simuler la récupération des détails de l'utilisateur
    
    return (
    <DashboardShell>
      <section id="catalogue" className="relative flex-1 justify-between flex flex-col p-4">
        <UserDetails user={user} />
      </section>
    </DashboardShell>
    );
};

export default ClientByIdPage;