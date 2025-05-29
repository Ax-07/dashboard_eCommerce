"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { Button } from "@/src/components/ui/button"
import { Calendar } from "@/src/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover"
import { cn } from "@/src/utils/tailwind_cn"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import { useChartsDatas } from "./charts/useChartsDatas"

interface DatePickerWithRangeProps {
  date?: DateRange
  onChange: (range: DateRange) => void
  className?: string
}

export function DatePickerWithRange({
  date,
  onChange,
  className,}: DatePickerWithRangeProps) {

  const toggleClassName = "w-full py-1.5 px-2.5 cursor-pointer rounded-md";


  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-auto p-0" align="start">
            <ToggleGroup type="single" className="flex flex-col gap-2 p-4 border-r" defaultValue="today">
                {/* Today */}
                <ToggleGroupItem
                    value="today"
                    className={cn(toggleClassName, "")}
                    onClick={() => onChange({ from: new Date(), to: new Date() })}
                >
                    Today
                </ToggleGroupItem>
                {/* Yesterday */}
                <ToggleGroupItem
                    value="yesterday"
                    className={cn(toggleClassName, "")}
                    onClick={() => onChange({ from: addDays(new Date(), -1), to: addDays(new Date(), -1) })}
                >
                    Yesterday
                </ToggleGroupItem>
                {/* This week */}
                <ToggleGroupItem
                    value="cette-semaine"
                    className={cn(toggleClassName, "")}
                    onClick={() =>
                    onChange({
                        from: addDays(new Date(), -new Date().getDay()),
                        to: addDays(new Date(), 6 - new Date().getDay()),
                    })
                    }
                >
                    This week
                </ToggleGroupItem>
                {/* This month */}
                <ToggleGroupItem
                    value="this-month"
                    className={cn(toggleClassName, "")}
                    onClick={() =>
                    onChange({
                        from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                        to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
                    })
                    }
                >
                    This month
                </ToggleGroupItem>
                {/* This trimester */}
                <ToggleGroupItem
                    value="this-trimester"
                    className={cn(toggleClassName, "")}
                    onClick={() => {
                      const currentMonth = new Date().getMonth();
                      const startMonth = currentMonth - (currentMonth % 3);
                      onChange({
                        from: new Date(new Date().getFullYear(), startMonth, 1),
                        to: new Date(new Date().getFullYear(), startMonth + 3, 0),
                      })
                    }}
                >
                    This trimester
                </ToggleGroupItem>
                {/* This year */}
                <ToggleGroupItem
                    value="this-year"
                    className={cn(toggleClassName, "")}
                    onClick={() =>
                    onChange({
                        from: new Date(new Date().getFullYear(), 0, 1),
                        to: new Date(new Date().getFullYear(), 11, 31),
                    })
                    }
                >
                    This year
                </ToggleGroupItem>
                {/* Last year */}
                <ToggleGroupItem
                    value="last-year"
                    className={cn(toggleClassName, "")}
                    onClick={() => {
                      const lastYear = new Date(new Date().getFullYear() - 1, 0, 1)
                      onChange({
                        from: lastYear,
                        to: new Date(lastYear.getFullYear(), 11, 31),
                      })
                    }}
                >
                    Last year
                </ToggleGroupItem>
            </ToggleGroup>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(range)=> {if (range) onChange(range)}}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
