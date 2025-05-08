"use client"

import { cn } from "@/src/utils/tailwind_cn";
import React from "react";

const GRID_AREAS = [
  { area: "mobile", cols: "col-span-18", rows: "row-span-36" },  // 📱 Mobile à gauche
  { area: "desktop", cols: "col-span-33", rows: "row-span-18" }, // 💻 Desktop en haut à droite
  { area: "tablet", cols: "col-span-13", rows: "row-span-18" },  // 🖥 Tablet en haut à droite
  { area: "tablet", cols: "col-span-13", rows: "row-span-18" },  // 🖥 Tablet en bas à droite
  { area: "desktop", cols: "col-span-33", rows: "row-span-18" }, // 💻 Desktop en bas à droite
];

const Masonry = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "grid mx-auto gap-3",
        "auto-rows-[1px]",
        "grid-cols-64", // Structure basée sur ton image
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

interface MasonryItemProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc: string;
  alt?: string;
  areaIndex: number;
  variant?: "desktop" | "mobile" | "tablet";
}

const MasonryItem = React.forwardRef<HTMLDivElement, MasonryItemProps>(
  ({ className, imageSrc, alt = "", areaIndex, variant='desktop', ...props }, ref) => {
    const { cols, rows } = GRID_AREAS[areaIndex] || {
      cols: "col-span-1",
      rows: "row-span-1",
    };
    const aspectClass = {
      desktop: "aspect-[16/9]",
      mobile: "aspect-[10/21.6]",
      tablet: "aspect-[2/3]",
    }[variant];
    
    return (
      <figure
        ref={ref}
        className={cn(
          "relative w-full overflow-hidden rounded-lg bg-gray-800 group",
          cols,
          rows,
          aspectClass,
          "before:absolute before:inset-0 before:rounded-lg before:z-10",
          "before:shadow-[inset_4px_4px_6px_rgba(0,0,0,0.3),_inset_-4px_-4px_6px_rgba(255,255,255,0.5)]",
          "hover:before:shadow-[inset_6px_6px_10px_rgba(0,0,0,0.4),_inset_-6px_-6px_10px_rgba(255,255,255,0.6)]",
          "hover:scale-[1.01] transition-all duration-300 ease-in-out",
          className
        )}
        {...props}
      >
        <img
          src={imageSrc}
          alt={alt}
          className="absolute z-0 w-full h-full object-contain transition-all duration-300 group-hover:opacity-90"
        />
      </figure>
    );
  }
);

export { Masonry, MasonryItem };
