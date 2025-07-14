import { cn } from "@/lib/cn";
import { PoolStatus } from "@/types/mining-pool";

interface StatusBadgeProps {
  status: PoolStatus;
}

const statusConfig = {
  online: {
    label: "Online",
    className:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  degraded: {
    label: "Degraded",
    className:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  },
  offline: {
    label: "Offline",
    className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        config.className
      )}
    >
      <span className="w-2 h-2 rounded-full bg-current mr-1.5" />
      {config.label}
    </span>
  );
}
