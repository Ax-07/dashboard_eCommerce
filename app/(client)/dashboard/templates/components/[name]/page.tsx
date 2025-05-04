// app/client/dashboard/templates/components/[id].tsx
"use client";
import React, { useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { componentsList } from "@/src/blocks/admins/templates/components/ComponentList";
import { DashboardShell } from "@/src/blocks/dashboardBlocks/DashboardShell";
import { Button } from "@/src/components/ui/button";
import { ResizableDevice } from "@/src/components/ui/resizableDevice";
import { Separator } from "@/src/components/ui/separator";
import { cn } from "@/src/utils/tailwind_cn";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import Link from "next/link";

const rezizableSize = {
  mobile: 50,
  tablet: 50,
  desktop: 100,
};

const ComponentDetailPage = () => {
  const { name } = useParams() as { name: string };
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [openRightSidebar, setOpenRightSidebar] = useState(false);

  // Recherche du composant dans la liste à partir de son id
  const componentItem = componentsList.find(
    (item) => item.name.toString() === name
  );

  if (!componentItem) {
    return (
      <DashboardShell>
        <p>Composant non trouvé</p>
        <Button onClick={() => router.back()}>Retour</Button>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <div className="relative w-[80vw] h-[80svh] p-8">
        <div className="flex gap-4 items-center mb-4">
          <Button variant="outline" className="" onClick={() => router.back()}>
            Retour
          </Button>
          <h1 className="text-2xl font-bold">{componentItem.name}</h1>
          <Link href={`/preview/${encodeURIComponent(componentItem.name)}`} target="_blank" className="text-sm text-blue-500 hover:underline">
            Ouvrir dans un nouvel onglet
          </Link>
        </div>
        <div className="flex gap-4 items-center mb-4 h-full">
          <div 
           ref={containerRef}
          className={cn(
            `${
              openRightSidebar ? "w-3/4" : "w-full"
            } transition-all duration-300
             h-full
            `
          )}
          >
            <ResizableDevice parentRef={containerRef}>
              <iframe
                src={`/preview/${encodeURIComponent(componentItem.name)}`}
                title={componentItem.name}
                className="w-full h-full"
                style={{ minHeight: "300px", border: "none" }}
              />
            </ResizableDevice>
          </div>
          <Separator orientation="vertical" className="h-full" />
          <div
            className={cn(
              `${
                openRightSidebar ? "w-1/4" : "w-0"
                } transition-all duration-300 h-full`
              )}
          >
            <button
              onClick={() => setOpenRightSidebar(!openRightSidebar)}
              className="inline-flex items-center justify-center rounded-md cursor-pointer focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground size-7"
            >
              {openRightSidebar ? <PanelRightClose /> : <PanelRightOpen />}
            </button>
            <div className={`${openRightSidebar ? "block" : "hidden"} p-4`}>
              <h2 className="text-lg font-semibold mb-2">Détails du composant</h2>
              <p className="text-sm text-gray-600 mb-2">Nom : {componentItem.name}</p>
              <p className="text-sm text-gray-600 mb-4">Catégorie : {componentItem.category}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};

export default ComponentDetailPage;
