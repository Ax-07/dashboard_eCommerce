// @/app/%28client%29/clients/%5Bid%5D/page.tsx

import React from 'react';

interface ClientByIdPageProps {
    params: { id: string };
}

const ClientByIdPage: React.FC<ClientByIdPageProps> = ({params}) => {
    const clientId = params.id; // Utiliser l'ID du client pour récupérer les détails du client
    return (
        <div>
            <h1>
                Détails du client avec l'ID : {clientId}
            </h1>
        </div>
    );
};

export default ClientByIdPage;