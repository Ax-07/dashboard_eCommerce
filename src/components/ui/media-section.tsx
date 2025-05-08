"use client"

import * as React from "react";
import { cn } from "@/src/utils/tailwind_cn";

export interface MediaSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Permet d'inverser l'ordre des colonnes sur grand écran.
   * - false (par défaut) : affiche l'Aside à gauche et le Content à droite.
   * - true : affiche le Content à gauche et l'Aside à droite.
   * @default false
   */
  reverse?: boolean;
  /** Les sous-composants MediaSectionContent/MediaSectionBody et MediaSectionAside. */
  children: React.ReactNode;
}

const MediaSection = React.forwardRef<HTMLDivElement, MediaSectionProps>(
  ({ reverse = false, className, children, ...props }, ref) => {
    const childArray = React.Children.toArray(children); console.log("childArray", childArray)

    return (
      <div
        ref={ref}
        className={cn("flex flex-col xl:flex-row gap-4", className)}
        {...props}
      >
    {reverse ? [...childArray].reverse() : childArray}

      </div>
    );
  }
);
MediaSection.displayName = "MediaSection";

/**
 * MediaSection.Content est destiné à afficher le contenu principal (texte, titres, etc.).
 *
 * @component
 */
const MediaSectionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-4 p-6 pt-0 text-body text-muted-foreground", className)} {...props} />
));
MediaSectionContent.displayName = "MediaSectionContent";

/**
 * MediaSection.Body est destiné à servir de conteneur regroupant par exemple un en-tête et un contenu détaillé.
 *
 * @component
 */
const MediaSectionBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-4 p-4 w-full xl:w-1/2 ", className)} {...props} />
));
MediaSectionBody.displayName = "MediaSectionBody";

/**
 * MediaSection.Aside est destiné à afficher un contenu complémentaire (par exemple, une image).
 *
 * @component
 */
const MediaSectionAside = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <aside ref={ref} className={cn("relative w-full lg:w-1/2 p-4", className)} {...props} />
));
MediaSectionAside.displayName = "MediaSectionAside";

const MediaSectionHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6 gap-2", className)}
    {...props}
  />
));
MediaSectionHeader.displayName = "MediaSectionHeader";

const MediaSectionTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-3xl font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
MediaSectionTitle.displayName = "MediaSectionTitle";

const MediaSectionSubTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
MediaSectionSubTitle.displayName = "MediaSectionSubTitle";

const MediaSectionDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-base text-foreground", className)}
    {...props}
  />
));
MediaSectionDescription.displayName = "MediaSectionDescription";

export {
  MediaSection,
  MediaSectionAside,
  MediaSectionBody,
  MediaSectionHeader,
  MediaSectionTitle,
  MediaSectionSubTitle,
  MediaSectionDescription,
  MediaSectionContent,
};

// exemple d'utilisation
// <MediaSection reverse={true}>
//   <MediaSectionAside>Aside</MediaSectionAside>
//   <MediaSectionContent>
//     <MediaSectionHeader>
//       <MediaSectionTitle>Title</MediaSectionTitle>
//     </MediaSectionHeader>
//     <MediaSectionBody>Body</MediaSectionBody>
//   </MediaSectionContent>
// </MediaSection>
