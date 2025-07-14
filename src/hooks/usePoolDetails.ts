import { useQuery } from "@tanstack/react-query";
import { miningPoolsApi } from "@/api/mining-pools";

export const usePoolDetails = (poolId: string | null) => {
  return useQuery({
    queryKey: ["mining-pool", poolId],
    queryFn: () => (poolId ? miningPoolsApi.getPoolDetails(poolId) : null),
    enabled: !!poolId,
  });
};
