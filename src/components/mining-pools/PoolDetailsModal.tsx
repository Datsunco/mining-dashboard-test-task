import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MiningPoolDetails } from "@/types/mining-pool";
import { StatusBadge } from "./StatusBadge";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PoolDetailsModalProps {
  pool: MiningPoolDetails | null | undefined;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
}

export function PoolDetailsModal({
  pool,
  isOpen,
  isLoading,
  onClose,
}: PoolDetailsModalProps) {
  const { t } = useTranslation();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{pool?.name || "Загрузка..."}</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2
              className="h-8 w-8 animate-spin"
              data-testid="modal-loading"
            />
          </div>
        ) : pool ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("modal.status")}
                </p>
                <StatusBadge status={pool.status} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("modal.location")}
                </p>
                <p className="font-medium">{pool.location}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("modal.hashrate")}
                </p>
                <p className="font-medium">
                  {pool.hashrateTHs.toFixed(1)} TH/s
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("modal.workers")}
                </p>
                <p className="font-medium">
                  {pool.activeWorkers.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("modal.rejectRate")}
                </p>
                <p className="font-medium">
                  {(pool.rejectRate * 100).toFixed(2)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("modal.uptime")}
                </p>
                <p className="font-medium">{pool.uptimePercent.toFixed(2)}%</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("modal.revenue24h")}
                </p>
                <p className="font-medium">{pool.last24hRevenueBTC} BTC</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("modal.fee")}
                </p>
                <p className="font-medium">{pool.feePercent}%</p>
              </div>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
