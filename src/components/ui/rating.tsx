"use client";

import React, { useState, forwardRef, KeyboardEvent } from "react";
import { cn } from "@/src/utils/tailwind_cn";
import { cva, type VariantProps } from "class-variance-authority";

// Variantes de style pour le container de la notation.
const ratingContainerVariants = cva("flex items-center gap-2", {
  variants: {
    size: {
      default: "h-6 w-6", // environ 24px
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      lg: "h-8 w-8",
    },
  },
  defaultVariants: { size: "default" },
});

export interface RatingProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ratingContainerVariants> {
  /** Pour usage contrôlé : valeur de la note. */
  value?: number;
  /** Pour usage non contrôlé : note par défaut. */
  defaultRating?: number;
  /** Rend le composant en lecture seule. */
  readOnly?: boolean;
  /** Nom pour l’intégration dans les formulaires. */
  name?: string;
  /** Callback appelée lors du changement de la note. */
  onRatingChange?: (rating: number) => void;
}

const Rating = forwardRef<HTMLDivElement, RatingProps>(
  function Rating(
    {
      className,
      size,
      value,
      defaultRating = 0,
      readOnly = false,
      name,
      onRatingChange,
      ...props
    },
    ref
  ) {
    // Gestion de l'état en mode non contrôlé.
    const [internalRating, setInternalRating] = useState(defaultRating);
    // Si une valeur contrôlée est passée, elle prévaut.
    const effectiveRating = value !== undefined ? value : internalRating;

    // Met à jour la note et déclenche le callback.
    const updateRating = (newRating: number) => {
      if (readOnly) return;
      if (value === undefined) {
        setInternalRating(newRating);
      }
      onRatingChange && onRatingChange(newRating);
    };

    // Gestion de la navigation au clavier.
    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (readOnly) return;
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        updateRating(Math.min(5, effectiveRating + 1));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        updateRating(Math.max(0, effectiveRating - 1));
      }
    };

    return (
      <>
        <div
          ref={ref}
          className={cn(ratingContainerVariants({ size }),"w-fit", className)}
          role="radiogroup"
          tabIndex={readOnly ? -1 : 0}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {Array.from({ length: 5 }, (_, index) => {
            const currentRating = index + 1;
            const isSelected = effectiveRating >= currentRating;
            return (
              <span
                key={`star-${index}-${effectiveRating}`} // Force un remount pour relancer l'animation.
                style={isSelected ? { animationDelay: `${index * 50}ms` } : {}}
                className={cn(
                  !readOnly &&
                    "cursor-pointer select-none transition-colors transform duration-200 ease-in-out hover:scale-110 active:scale-95",
                  isSelected
                    ? "text-yellow-300 animate-pop illuminated-star"
                    : "text-gray-300"
                )}
                onClick={() => updateRating(currentRating)}
                aria-label={`Note ${currentRating}`}
                role="radio"
                aria-checked={isSelected}
              >
                <Star
                  filled={isSelected}
                  className={cn(size ? ratingContainerVariants({ size }) : "")}
                />
                
              </span>
            );
          })}
            {/* Affichage de la note actuelle */}
            <span
                className="ml-2 text-sm font-semibold text-muted-foreground"
                aria-live="polite"
            >
                {readOnly ? `(${effectiveRating})` : `Sélectionnez une note`}
            </span>
          {name && <input type="hidden" name={name} value={effectiveRating} />}
        </div>

        {/* Styles d'animation et d'ombre */}
        <style jsx global>{`
          @keyframes pop {
            0% {
              transform: scale(0.5);
              opacity: 0;
            }
            80% {
              transform: scale(1.15);
              opacity: 1;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          .animate-pop {
            animation: pop 0.3s ease-out forwards;
          }
          .illuminated-star {
            filter: drop-shadow(0 0 4x rgba(253, 224, 71, 0.8));
          }
        `}</style>
      </>
    );
  }
);

Rating.displayName = "Rating";

export { Rating };

interface StarProps extends React.SVGProps<SVGSVGElement> {
  /** Indique si l’étoile doit être remplie. */
  filled?: boolean;
}

const Star = forwardRef<SVGSVGElement, StarProps>(
  function Star({ filled = false, className, ...props }, ref) {
    return (
      <svg
        ref={ref}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        fill={filled ? "currentColor" : "none"}
        stroke={"currentColor"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M12 .587l3.668 7.568 8.332 1.208-6.004 5.855 1.418 8.281L12 18.896l-7.414 3.88L6.004 15.22l-6.004-5.855 8.332-1.208L12 .587z" />
      </svg>
    );
  }
);

Star.displayName = "Star";

export { Star };
