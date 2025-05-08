"use client"

import { cn } from "@/src/utils/tailwind_cn";
import React from "react";

const Gallery = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-xl shadow-sm p-4", className)}
    {...props}
  />
));

interface Image extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc: string;
  alt: string;
}

const GalleryItem = React.forwardRef<
  HTMLDivElement, Image
>(({ className, imageSrc, alt, ...props }, ref) => (
  <figure
    ref={ref}
    className={cn("", className)}
    {...props}
  >
    <img src={imageSrc} alt={alt} />
  </figure>
));



export { Gallery, GalleryItem };
