import React from 'react';

interface CommandeByIdPageProps {
    params: { id: string };
}
const CommandeByIdPage: React.FC<CommandeByIdPageProps> = ({params}) => {
    const commandeId = params.id; // Utiliser l'ID de la commande pour récupérer les détails de la commande
    return (
        <div>
            
        </div>
    );
};

export default CommandeByIdPage;