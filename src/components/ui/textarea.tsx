"use client"

import * as React from "react"
import { cn } from "@/src/utils/tailwind_cn"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  const innerRef = React.useRef<HTMLTextAreaElement | null>(null)
  const combinedRef = (el: HTMLTextAreaElement) => {
    innerRef.current = el
    if (typeof ref === "function") ref(el)
    else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = el
  }

  const resize = () => {
    const textarea = innerRef.current
    if (!textarea) return
    textarea.style.height = "auto" // reset
    textarea.style.height = `${textarea.scrollHeight}px` // adjust
  }

  React.useEffect(() => {
    resize()
  }, [])

  return (
    <textarea
      {...props}
      ref={combinedRef}
      onInput={(e) => {
        resize()
        props.onInput?.(e)
      }}
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
