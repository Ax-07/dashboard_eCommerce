"use client"

import { cn } from "@/src/utils/tailwind_cn"
import * as React from "react"
import { SearchIcon } from "lucide-react"

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  placeholder?: string
}
const SearchInput: React.FC<SearchInputProps> = ({
  className,
  placeholder,
    ...props
}) => {
  return (
    <div className={cn(
        "flex h-9 items-center rounded-md gap-2 border px-3",
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
        )}>
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <input
        type="search"
        placeholder={placeholder}
        className={cn(
            "placeholder:text-muted-foreground flex w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
        )}
        {...props}
      />
    </div>
  )
}

export default SearchInput;