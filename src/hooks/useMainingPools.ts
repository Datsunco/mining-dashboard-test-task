import { useQuery } from "@tanstack/react-query";
import { miningPoolsApi } from "@/api/mining-pools";

export const useMiningPools = () => {
  return useQuery({
    queryKey: ["mining-pools"],
    queryFn: miningPoolsApi.getPools,
  });
};
