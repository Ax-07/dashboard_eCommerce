import React from "react";
import { Button } from "@/src/components/ui/button";
import { ArrowUpDownIcon, SortAsc, SortDesc } from "lucide-react";

interface ButtonSortProps {
  toggle: () => void;
  isActive: boolean;           // nouvelle prop
  isAsc: boolean;              // sens du tri (utile si isActive)
}

const ButtonSort: React.FC<ButtonSortProps> = ({ toggle, isActive, isAsc }) => {
  return (
    <Button variant="ghost" onClick={toggle}>
      { !isActive && <ArrowUpDownIcon className="h-4 w-4 opacity-50" /> }
      { isActive && isAsc  && <SortAsc   className="h-4 w-4" /> }
      { isActive && !isAsc && <SortDesc  className="h-4 w-4" /> }
    </Button>
  );
};

export default ButtonSort;
