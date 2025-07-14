import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { useMiningPools } from "../useMiningPools";
import { useMiningPools } from "@/hooks/useMainingPools";
import { miningPoolsApi } from "@/api/mining-pools";

vi.mock("@/api/mining-pools");

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useMiningPools", () => {
  it("fetches mining pools successfully", async () => {
    const mockPools = [
      { id: "1", name: "Pool 1", hashrateTHs: 100 },
      { id: "2", name: "Pool 2", hashrateTHs: 200 },
    ];

    vi.mocked(miningPoolsApi.getPools).mockResolvedValue(mockPools);

    const { result } = renderHook(() => useMiningPools(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockPools);
  });

  it("handles error state", async () => {
    vi.mocked(miningPoolsApi.getPools).mockRejectedValue(
      new Error("Failed to fetch")
    );

    const { result } = renderHook(() => useMiningPools(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error?.message).toBe("Failed to fetch");
  });
});
