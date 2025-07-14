import { MiningPool, MiningPoolDetails } from "@/types/mining-pool";
import { mockPools } from "./mock-data";

// Симуляция сетевой задержки
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const miningPoolsApi = {
  async getPools(): Promise<MiningPool[]> {
    await delay(500);

    return mockPools.map(
      ({ id, name, hashrateTHs, activeWorkers, rejectRate, status }) => ({
        id,
        name,
        hashrateTHs,
        activeWorkers,
        rejectRate,
        status,
      })
    );
  },

  async getPoolDetails(id: string): Promise<MiningPoolDetails | null> {
    await delay(300);

    const pool = mockPools.find((p) => p.id === id);
    if (!pool) {
      throw new Error("Pool not found");
    }

    return pool;
  },
};
