import { cn } from "@/lib/cn";
import { MiningPool } from "@/types/mining-pool";

interface StatusIndicatorCircleProps {
  status: MiningPool["status"];
}

export function StatusIndicatorCircle({ status }: StatusIndicatorCircleProps) {
  return (
    <span
      aria-label={`Status: ${status}`}
      className={cn("h-2.5 w-2.5 rounded-full", {
        "bg-green-500": status === "online",
        "bg-yellow-500": status === "degraded",
        "bg-red-500": status === "offline",
      })}
    />
  );
}
