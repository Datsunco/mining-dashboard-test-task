import { describe, it, expect, beforeEach, vi } from "vitest";
import { miningPoolsApi } from "@/api/mining-pools";

describe("miningPoolsApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getPools", () => {
    it("returns list of pools without details", async () => {
      const pools = await miningPoolsApi.getPools();

      expect(pools).toHaveLength(4);
      expect(pools[0]).toHaveProperty("id");
      expect(pools[0]).toHaveProperty("name");
      expect(pools[0]).toHaveProperty("hashrateTHs");
      expect(pools[0]).not.toHaveProperty("last24hRevenueBTC");
    });

    it("simulates network delay", async () => {
      const start = Date.now();
      await miningPoolsApi.getPools();
      const duration = Date.now() - start;

      expect(duration).toBeGreaterThanOrEqual(400);
    });
  });

  describe("getPoolDetails", () => {
    it("returns pool details for valid id", async () => {
      const details = await miningPoolsApi.getPoolDetails("pool-1");

      expect(details).toBeDefined();
      expect(details?.id).toBe("pool-1");
      expect(details).toHaveProperty("last24hRevenueBTC");
      expect(details).toHaveProperty("uptimePercent");
      expect(details).toHaveProperty("location");
      expect(details).toHaveProperty("feePercent");
    });

    it("throws error for invalid id", async () => {
      await expect(miningPoolsApi.getPoolDetails("invalid-id")).rejects.toThrow(
        "Pool not found"
      );
    });
  });
});
