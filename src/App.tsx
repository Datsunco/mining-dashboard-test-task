import { useState, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { PoolsTable } from "@/components/mining-pools/PoolsTable";
import { PoolDetailsModal } from "@/components/mining-pools/PoolDetailsModal";
import { PoolsStatistics } from "@/components/mining-pools/PoolsStatistics";
import { PoolsFilter } from "@/components/mining-pools/PoolsFilter";
import { ExportButton } from "@/components/mining-pools/ExportButton";
import { useMiningPools } from "@/hooks/useMainingPools";
import { usePoolDetails } from "@/hooks/usePoolDetails";
import { PoolStatus } from "@/types/mining-pool";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();
  const [selectedPoolId, setSelectedPoolId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<PoolStatus | "all">("all");

  const { data: pools = [], isLoading: isLoadingPools } = useMiningPools();
  const { data: poolDetails, isLoading: isLoadingDetails } =
    usePoolDetails(selectedPoolId);

  const filteredPools = useMemo(() => {
    if (statusFilter === "all") return pools;
    return pools.filter((pool) => pool.status === statusFilter);
  }, [pools, statusFilter]);

  const handleViewDetails = (poolId: string) => {
    setSelectedPoolId(poolId);
  };

  const handleCloseModal = () => {
    setSelectedPoolId(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">{t("main.title")}</h2>
            <p className="text-muted-foreground">{t("main.description")}</p>
          </div>

          {!isLoadingPools && pools.length > 0 && (
            <PoolsStatistics pools={pools} />
          )}

          <div className="flex justify-end gap-2">
            <PoolsFilter
              onFilterChange={setStatusFilter}
              currentFilter={statusFilter}
            />
            <ExportButton pools={filteredPools} />
          </div>

          <PoolsTable
            pools={filteredPools}
            isLoading={isLoadingPools}
            onViewDetails={handleViewDetails}
          />
        </div>
      </main>

      <PoolDetailsModal
        pool={poolDetails}
        isOpen={!!selectedPoolId}
        isLoading={isLoadingDetails}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
