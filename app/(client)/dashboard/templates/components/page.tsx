// app/client/dashboard/templates/components/page.tsx

"use client";
import React from 'react';
import { DashboardShell } from '@/src/blocks/dashboardBlocks/DashboardShell';
import { Separator } from '@/src/components/ui/separator';
import { Button } from '@/src/components/ui/button';
import { ComponentItem, componentsList } from '@/src/blocks/admins/templates/components/ComponentList';
import Link from 'next/link';

const categoryFilter = [
    { name: 'All', value: 'all' },
    { name: 'Headers', value: 'headers' },
    { name: 'Footers', value: 'footers' },
    { name: 'Heros', value: 'heros' },
];


// Composant pour afficher une carte avec prévisualisation du composant
const ComponentCard: React.FC<{ item: ComponentItem }> = ({ item }) => {
    return (
      <div className="border p-4 rounded shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-lg font-bold mb-2">{item.name}</h3>
        <p className="text-sm text-gray-600 mb-4">Catégorie : {item.category}</p>
        {/* Conteneur de prévisualisation avec hauteur fixe */}
        <div className="border rounded overflow-hidden" style={{ height: "150px" }}>
          {item.component}
        </div>
        <Button variant="outline" className="mt-2 w-full" asChild>
            <Link href={`/dashboard/templates/components/${item.name}`}>Voir le composant</Link>
        </Button>
      </div>
    );
  };

const ComponentsPage = () => {
    const [selectedCategory, setSelectedCategory] = React.useState('all');
      // Filtrage des composants en fonction de la catégorie sélectionnée
  const filteredComponents = selectedCategory === "all"
  ? componentsList
  : componentsList.filter(
      (comp) => comp.category === selectedCategory
    );

    return (
        <DashboardShell>
        <section className="w-full px-8">
          <div className="flex justify-between items-center mb-4">
            <h1>Components page</h1>
          </div>
          <Separator className="mb-4 bg-gradient" />
        </section>
        <section className="grid gap-4 p-4">
            <div className="flex flex-col gap-2 items-center mb-4">
                <h2>Filter by category</h2>
                <div className="flex space-x-4">
                {categoryFilter.map((category) => (
                    <Button
                    key={category.value}
                    variant={selectedCategory === category.value ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category.value)}
                    >
                    {category.name}
                    </Button>
                ))}
                </div>
            </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredComponents.length > 0 ? (
            filteredComponents.map((item) => (
              <ComponentCard key={item.id} item={item} />
            ))
          ) : (
            <p>Aucun composant trouvé pour cette catégorie.</p>
          )}
        </div>
        </section>
      </DashboardShell>
    );
};

export default ComponentsPage;