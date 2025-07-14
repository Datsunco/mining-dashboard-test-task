import { useState } from "react";
import { PoolStatus } from "@/types/mining-pool";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

interface PoolsFilterProps {
  onFilterChange: (status: PoolStatus | "all") => void;
  currentFilter: PoolStatus | "all";
}

export function PoolsFilter({
  onFilterChange,
  currentFilter,
}: PoolsFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const filters = [
    { value: "all", label: "All Pools", color: "bg-gray-100 dark:bg-gray-800" },
    {
      value: "online",
      label: "Online",
      color:
        "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300",
    },
    {
      value: "degraded",
      label: "Degraded",
      color:
        "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300",
    },
    {
      value: "offline",
      label: "Offline",
      color: "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300",
    },
  ];

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2"
      >
        <Filter className="h-4 w-4" />
        Filter
        {currentFilter !== "all" && (
          <span className="ml-1 px-2 py-0.5 bg-primary/10 rounded-full text-xs">
            {currentFilter}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-background border animate-in fade-in-0 zoom-in-95 z-10">
          <div className="p-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => {
                  onFilterChange(filter.value as PoolStatus | "all");
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full px-3 py-2 text-left text-sm rounded-md transition-colors flex items-center justify-between",
                  currentFilter === filter.value
                    ? filter.color
                    : "hover:bg-muted"
                )}
              >
                <span>{filter.label}</span>
                {currentFilter === filter.value && <X className="h-3 w-3" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
