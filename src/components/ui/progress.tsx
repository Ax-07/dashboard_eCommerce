"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/src/utils/tailwind_cn"
import { Check } from "lucide-react"

type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root> & {
  value?: number
  max?: number
  variant?: "linear" | "circle"
  size?: number // for circle
  isKanban?: boolean
}

function Progress({
  className,
  value = 0,
  max = 100,
  variant = "linear",
  size = 40,
  isKanban,
  ...props
}: ProgressProps) {
  const percentage = Math.min((value / max) * 100, 100)

  if (variant === "circle") {
    const strokeWidth = 4
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (percentage / 100) * circumference

    return (
      <div
        className={cn("relative inline-block", className)}
        style={{ width: size, height: size }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="rotate-[-90deg]" // start progress from top
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="hsl(var(--primary))"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-foreground">
          {percentage === 100 ? (
            <Check className="w-4 h-4 text-primary" />
          ) : (
        <span className="absolute inset-0 flex items-center justify-center text-xs text-foreground">
          {Math.round(percentage)}<span className="text-[10px]">%</span>
        </span>
          )}
          </div>
      </div>
    )
  }

  // linear variant
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        `bg-primary/20 relative h-2 w-full overflow-hidden rounded-full ${isKanban && "hidden"}`,
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
