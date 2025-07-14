import { useMemo } from "react";
import { MiningPool } from "@/types/mining-pool";
import { Activity, Users, TrendingUp, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/cn";
import { useTranslation } from "react-i18next";

interface PoolsStatisticsProps {
  pools: MiningPool[];
}

export function PoolsStatistics({ pools }: PoolsStatisticsProps) {
  const { t } = useTranslation();

  const stats = useMemo(() => {
    const totalHashrate = pools.reduce(
      (sum, pool) => sum + pool.hashrateTHs,
      0
    );
    const totalWorkers = pools.reduce(
      (sum, pool) => sum + pool.activeWorkers,
      0
    );
    const avgRejectRate =
      pools.length > 0
        ? pools.reduce((sum, pool) => sum + pool.rejectRate, 0) / pools.length
        : 0;
    const onlinePools = pools.filter((pool) => pool.status === "online").length;

    return {
      totalHashrate,
      totalWorkers,
      avgRejectRate,
      onlinePools,
      totalPools: pools.length,
    };
  }, [pools]);

  const cards = useMemo(
    () => [
      {
        title: t("statsCards.totalHashrate"),
        value: `${stats.totalHashrate.toFixed(1)} ${t("units.thps")}`,
        icon: Activity,
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-100 dark:bg-blue-900/20",
      },
      {
        title: t("statsCards.activeWorkers"),
        value: stats.totalWorkers.toLocaleString(), // toLocaleString is already locale-aware
        icon: Users,
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-100 dark:bg-green-900/20",
      },
      {
        title: t("statsCards.onlinePools"),
        // 3. Use interpolation for dynamic values within a string
        value: t("statsCards.onlineRatio", {
          online: stats.onlinePools,
          total: stats.totalPools,
        }),
        icon: TrendingUp,
        color: "text-purple-600 dark:text-purple-400",
        bgColor: "bg-purple-100 dark:bg-purple-900/20",
      },
      {
        title: t("statsCards.avgRejectRate"),
        value: `${(stats.avgRejectRate * 100).toFixed(3)}${t("units.percent")}`,
        icon: AlertTriangle,
        color:
          stats.avgRejectRate > 0.03
            ? "text-orange-600 dark:text-orange-400"
            : "text-gray-600 dark:text-gray-400",
        bgColor:
          stats.avgRejectRate > 0.03
            ? "bg-orange-100 dark:bg-orange-900/20"
            : "bg-gray-100 dark:bg-gray-900/20",
      },
    ],
    [stats, t]
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className={cn(
              "rounded-lg border p-6 transition-all hover:shadow-md",
              "animate-in fade-in-50 slide-in-from-bottom-2",
              `animation-delay-${index * 100}`
            )}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </p>
                <p className="text-2xl font-bold mt-1">{card.value}</p>
              </div>
              <div className={cn("p-3 rounded-full", card.bgColor)}>
                <Icon className={cn("h-6 w-6", card.color)} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
