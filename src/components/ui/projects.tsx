"use client"

import { cn } from "@/src/utils/tailwind_cn";
import React from "react";

const Project = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <section ref={ref} className={cn("grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-8", className)} {...props} />
));

const ProjectItem = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <article
    ref={ref}
    className={cn("relative w-full aspect-video rounded-xl border bg-accent shadow-md p-4", className)}
    {...props}
  />
));

const ProjectImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, ...props }, ref) => (
  <figure className="overflow-hidden rounded-lg">
    <img
      ref={ref}
      className={cn("w-full h-full object-cover", className)}
      {...props}
    />
  </figure>
));

const ProjectContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("absolute bottom-0 p-4 space-y-2", className)} {...props} />
));

const ProjectTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-body font-semibold", className)} {...props} />
));

const ProjectDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-body text-gray-600", className)} {...props} />
));

const ProjectCaption = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <figcaption ref={ref} className={cn("text-sm text-gray-500 mt-1", className)} {...props} />
));

export {
  Project,
  ProjectItem,
  ProjectImage,
  ProjectContent,
  ProjectTitle,
  ProjectDescription,
  ProjectCaption,
};
