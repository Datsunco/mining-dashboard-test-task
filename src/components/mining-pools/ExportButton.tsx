import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiningPool } from "@/types/mining-pool";

interface ExportButtonProps {
  pools: MiningPool[];
}

export function ExportButton({ pools }: ExportButtonProps) {
  const handleExport = () => {
    const headers = [
      "Name",
      "Hashrate (TH/s)",
      "Workers",
      "Reject Rate (%)",
      "Status",
    ];
    const rows = pools.map((pool) => [
      pool.name,
      pool.hashrateTHs.toFixed(1),
      pool.activeWorkers.toString(),
      (pool.rejectRate * 100).toFixed(2),
      pool.status,
    ]);

    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join(
      "\n"
    );

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mining-pools-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleExport}
      className="gap-2"
    >
      <Download className="h-4 w-4" />
      Export CSV
    </Button>
  );
}
