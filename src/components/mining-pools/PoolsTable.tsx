import { useState, useMemo } from "react";
import { MiningPool } from "@/types/mining-pool";
import { StatusBadge } from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { useTranslation } from "react-i18next";
import { StatusIndicatorCircle } from "./StatusIndicatorCircle"; // 👈 1. Import the new component

interface PoolsTableProps {
  pools: MiningPool[];
  isLoading: boolean;
  onViewDetails: (poolId: string) => void;
}

type SortField = keyof Pick<
  MiningPool,
  "name" | "hashrateTHs" | "activeWorkers" | "rejectRate" | "status"
>;
type SortDirection = "asc" | "desc";

interface SortConfig {
  field: SortField | null;
  direction: SortDirection;
}

export function PoolsTable({
  pools,
  isLoading,
  onViewDetails,
}: PoolsTableProps) {
  const { t } = useTranslation();
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: null,
    direction: "asc",
  });

  const handleSort = (field: SortField) => {
    setSortConfig((prevConfig) => {
      if (prevConfig.field === field) {
        // Если кликнули на то же поле, меняем направление
        return {
          field,
          direction: prevConfig.direction === "asc" ? "desc" : "asc",
        };
      }
      // Если кликнули на новое поле, сортируем по возрастанию
      return {
        field,
        direction: "asc",
      };
    });
  };

  const sortedPools = useMemo(() => {
    if (!sortConfig.field) return pools;

    const sorted = [...pools].sort((a, b) => {
      const field = sortConfig.field!;
      const aValue = a[field];
      const bValue = b[field];

      // Обработка разных типов данных
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }

      // Для статуса используем порядок: online > degraded > offline
      if (field === "status") {
        const statusOrder = { online: 3, degraded: 2, offline: 1 };
        const aOrder = statusOrder[aValue as keyof typeof statusOrder];
        const bOrder = statusOrder[bValue as keyof typeof statusOrder];
        return sortConfig.direction === "asc"
          ? aOrder - bOrder
          : bOrder - aOrder;
      }

      return 0;
    });

    return sorted;
  }, [pools, sortConfig]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortConfig.field !== field) {
      return <ArrowUpDown className="ml-2 h-4 w-4 text-gray-400" />;
    }
    return sortConfig.direction === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2
          className="h-8 w-8 animate-spin"
          data-testid="loading-spinner"
        />
      </div>
    );
  }

  if (pools.length === 0) {
    return (
      <div className="rounded-md border">
        <div className="p-8 text-center text-muted-foreground">
          {t("Нет доступных майнинг пулов")}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="p-4 text-left">
              <button
                className="font-medium flex items-center hover:text-primary transition-colors"
                onClick={() => handleSort("name")}
              >
                {t("table.poolName")}
                <SortIcon field="name" />
              </button>
            </th>
            <th className="p-4 text-left">
              <button
                className="font-medium flex items-center hover:text-primary transition-colors"
                onClick={() => handleSort("hashrateTHs")}
              >
                {t("table.hashrate")}
                <SortIcon field="hashrateTHs" />
              </button>
            </th>
            <th className="p-4 text-left hidden md:table-cell">
              <button
                className="font-medium flex items-center hover:text-primary transition-colors"
                onClick={() => handleSort("activeWorkers")}
              >
                {t("table.activeWorkers")}
                <SortIcon field="activeWorkers" />
              </button>
            </th>
            <th className="p-4 text-left hidden md:table-cell">
              <button
                className="font-medium flex items-center hover:text-primary transition-colors"
                onClick={() => handleSort("rejectRate")}
              >
                {t("table.rejectRate")}
                <SortIcon field="rejectRate" />
              </button>
            </th>
            <th className="p-4 text-left hidden md:table-cell">
              <button
                className="font-medium flex items-center hover:text-primary transition-colors"
                onClick={() => handleSort("status")}
              >
                {t("table.status")}
                <SortIcon field="status" />
              </button>
            </th>
            <th className="p-4 text-left font-medium hidden md:table-cell">
              {t("table.actions")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedPools.map((pool, index) => (
            <tr
              key={pool.id}
              onClick={() => onViewDetails(pool.id)}
              className={cn(
                "border-b transition-colors hover:bg-muted/50 cursor-pointer",
                index % 2 === 0 ? "bg-background" : "bg-muted/10"
              )}
            >
              <td className="p-4 font-medium">
                <div className="flex items-center gap-3">
                  <StatusIndicatorCircle status={pool.status} />
                  <span>{pool.name}</span>
                </div>
              </td>
              <td className="p-4 tabular-nums">
                <span className="font-mono">{pool.hashrateTHs.toFixed(1)}</span>
              </td>
              <td className="p-4 tabular-nums hidden md:table-cell">
                <span className="font-mono">
                  {pool.activeWorkers.toLocaleString()}
                </span>
              </td>
              <td className="p-4 tabular-nums hidden md:table-cell">
                <span
                  className={cn(
                    "font-mono",
                    pool.rejectRate > 0.05 &&
                      "text-red-600 dark:text-red-400 font-semibold"
                  )}
                >
                  {(pool.rejectRate * 100).toFixed(2)}%
                </span>
              </td>
              <td className="p-4 hidden md:table-cell">
                <StatusBadge status={pool.status} />
              </td>
              <td className="p-4 hidden md:table-cell">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewDetails(pool.id);
                  }}
                  className="hover:scale-105 transition-transform"
                >
                  {t("table.viewDetails")}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
