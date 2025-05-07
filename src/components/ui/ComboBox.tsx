"use client"
// client\src\components\ui\ComboBox.tsx

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { ChevronDown, ChevronRight, X } from "lucide-react"
import { cn } from "@/src/utils/tailwind_cn";
import { Separator } from "./separator";

interface ComboboxProps {
  options: { value: string; label: string, description: string }[];
  placeholder?: string;
  onSelect?: (selected: string) => void;
  initialDisplayCount: number;
  children?: React.ReactNode;
}

interface ComboboxHeaderProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onSelect?: (selected: string) => void
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  placeholder?: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

interface ComboboxContentProps {
  children: React.ReactNode;
}

interface ComboboxListProps {
  children: React.ReactNode;
}

interface ComboboxItemProps {
  key: number;
  handleOptionClick: (option: { value: string; label: string }) => void;
  option: { value: string; label: string, description: string };
  isActive?: boolean;
  onHover?: () => void;
  index: number;
  inputValue: string;
}

type ComboboxComponent = React.FC<ComboboxProps> & {
  Header: React.FC<ComboboxHeaderProps>;
  Content: React.FC<ComboboxContentProps>;
  List: React.FC<ComboboxListProps>;
  Item: React.FC<ComboboxItemProps>;
};

const Combobox: ComboboxComponent = ({ options, placeholder, onSelect, initialDisplayCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [expanded, setExpanded] = useState(false);

  // Filtrer les options en fonction de la saisie
  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.value.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [options, inputValue]);

  const visibleOptions = expanded ? filteredOptions : filteredOptions.slice(0, initialDisplayCount);
  // Fermer la liste déroulante si l'utilisateur clique en dehors du composant
  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

   // Lorsqu'une option est sélectionnée
   const handleOptionClick = useCallback((option: { value: string; label: string }) => {
    setInputValue(option.value);
  
    if (onSelect) {
      onSelect(option.value);
    }
  
    setIsOpen(false);
  }, [onSelect]);

  // Gestion des touches du clavier
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;
  
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % filteredOptions.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev <= 0 ? filteredOptions.length - 1 : prev - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (filteredOptions[activeIndex]) {
          handleOptionClick(filteredOptions[activeIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  return (
    <div
      id="combobox"
      ref={containerRef}
      className={cn(`relative flex py-1 px-3 dark:bg-input/30 border border-input w-full rounded-sm text-sm h-9`)}
    >
      <Combobox.Header
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSelect={onSelect}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
      />
      {isOpen && visibleOptions.length > 0 && (
        <Combobox.Content>
          <Combobox.List>
            {visibleOptions.map((option, index) => (
              <Combobox.Item
                key={index}
                index={index}
                handleOptionClick={handleOptionClick}
                option={option}
                isActive={index === activeIndex}
                onHover={() => setActiveIndex(index)}
                inputValue={inputValue}
              />
            ))}
            {initialDisplayCount && 
            <>
            <Separator />
            <span
              key={visibleOptions.length}
              onClick={()=>setExpanded(!expanded)}
              className={cn(`cursor-pointer select-none rounded-sm px-2 py-1.5 w-full text-center text-sm transition-colors flex justify-center items-center gap-2 hover:bg-accent hover:text-accent-foreground`)}
              >
              {expanded ? "Voir moins" : "Voir plus"}
              <ChevronDown className={cn(`size-4`, expanded ? "" : "transform rotate-180 transition-all") } width={24} height={24} />
            </span>
            </>
            }
          </Combobox.List>
        </Combobox.Content>
      )}
    </div>
  );
};

Combobox.Header = ({
  inputValue,
  setInputValue,
  onSelect,
  isOpen,
  setIsOpen,
  placeholder,
  onKeyDown,
}: ComboboxHeaderProps) => {
  return (
    <div className={cn(`relative flex items-center z-10 w-full cursor-pointer `)} onClick={() => setIsOpen(!isOpen)}>
      <ChevronRight 
        data-state={isOpen ? 'open' : 'close'}
        
        className={cn(`cursor-pointer absolute right-0 size-4 transition-all data-[state=open]:rotate-90 data-[state=closed]:rotate-0`)} width={36} height={36}
        />
      <div className={cn(`flex items-center w-full`)}>
        <input
          id="combobox-input"
          className={cn(`min-w-50 focus:outline-none placeholder:text-muted-foreground`)}
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            // setIsOpen(true);
          }}
          placeholder={placeholder || "Sélectionner..."}

          onKeyDown={onKeyDown}
          autoComplete="off"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="combobox-content"
          aria-autocomplete="list"
          aria-label="Enter or select a speciality"
        />
      </div>
      {(inputValue) && (
        <X
          className={cn(`relative cursor-pointer size-4 right-6`)}
          onMouseDown={(e) => {
            e.preventDefault();
            setInputValue("")
            setIsOpen(true);
            if (onSelect) {
              onSelect("");
            }
          }}
          width={16}
          height={16}
        />
      )}
    </div>
  );
};

Combobox.Content = ({ children }: ComboboxListProps) => {
  return (
    <div 
      id="combobox-content"
      className={cn(`absolute top-10 z-150 left-0 right-0 outline outline-offset-0 outline-border list-none rounded-md`)}
      role="contentbox"
      >
      <div className={cn(`pb-6 bg-popover p-1`)}>
        {children}
      </div>
    </div>
  );
}

Combobox.List = ({ children }: ComboboxListProps) => {
  return (
    <ul 
      id="combobox-list"
      className={cn(`relative flex flex-col overflow-y-auto`)}
      role="listbox"
      >
      {children}
    </ul>
  );
};

Combobox.Item = ({ handleOptionClick, option, isActive, onHover, index, inputValue }: ComboboxItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (isActive && !isHovered && itemRef.current) {
      itemRef.current.scrollIntoView({ block: "nearest" });
    }
  }, [isActive, isHovered]);

  return (
    <li
      ref={itemRef}
      id={`combobox-item-${index}`}
      onMouseDown={(e) => {
        e.preventDefault();
        handleOptionClick(option);
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        onHover?.();
      }}
      onMouseLeave={() => {
        setIsHovered(false)
      }}
      className={cn(
        `
          cursor-default select-none rounded-sm px-2 py-1.5 text-sm
          transition-colors flex items-center gap-2
          data-[disabled]:pointer-events-none data-[disabled]:opacity-50
          hover:bg-accent hover:text-accent-foreground
        `,
        isActive && !isHovered && "bg-accent text-accent-foreground"
      )}
      role="option"
      aria-selected={isActive && !isHovered}
    >
      <p
        dangerouslySetInnerHTML={{
          __html: option.label.replace(
            new RegExp(`(${inputValue})`, "gi"),
            '<mark class="bg-transparent text-primary font-semibold">$1</mark>'
          ),
        }}
      />
      {option.description && (
        <span className={cn(`text-muted-foreground text-xs`)}>{option.description}</span>
      )}
    </li>
  );
};


export default Combobox;
