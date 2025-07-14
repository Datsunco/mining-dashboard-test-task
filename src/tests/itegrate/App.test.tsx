import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@/tests/test-utils";
import App from "@/App";
import { miningPoolsApi } from "@/api/mining-pools";

vi.mock("@/api/mining-pools");

describe("App Integration", () => {
  it("displays pools and opens details modal", async () => {
    const mockPools = [
      {
        id: "pool-1",
        name: "Test Pool",
        hashrateTHs: 100,
        activeWorkers: 200,
        rejectRate: 0.02,
        status: "online" as const,
      },
    ];

    const mockDetails = {
      ...mockPools[0],
      last24hRevenueBTC: 0.05,
      uptimePercent: 99.9,
      location: "Test Location",
      feePercent: 1.0,
    };

    vi.mocked(miningPoolsApi.getPools).mockResolvedValue(mockPools);
    vi.mocked(miningPoolsApi.getPoolDetails).mockResolvedValue(mockDetails);

    render(<App />);

    // Ждем загрузки данных
    await waitFor(() => {
      expect(screen.getByText("Test Pool")).toBeInTheDocument();
    });

    // Кликаем на кнопку подробнее
    const detailsButton = screen.getByText("Подробнее");
    fireEvent.click(detailsButton);

    // Проверяем, что модалка открылась с деталями
    await waitFor(() => {
      expect(screen.getByText("0.05 BTC")).toBeInTheDocument();
      expect(screen.getByText("Test Location")).toBeInTheDocument();
    });
  });

  it("toggles theme", async () => {
    render(<App />);

    const themeButton = screen.getByRole("button", { name: /toggle theme/i });
    fireEvent.click(themeButton);

    // Проверяем, что тема изменилась
    expect(document.documentElement).toHaveClass("dark");
  });
});
