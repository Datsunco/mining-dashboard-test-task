import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@/tests/test-utils";
import { PoolDetailsModal } from "@/components/mining-pools/PoolDetailsModal";
import { MiningPoolDetails } from "@/types/mining-pool";

const mockPoolDetails: MiningPoolDetails = {
  id: "test-1",
  name: "Test Pool",
  hashrateTHs: 830.5,
  activeWorkers: 1240,
  rejectRate: 0.012,
  status: "online",
  last24hRevenueBTC: 0.035,
  uptimePercent: 99.82,
  location: "Test Location",
  feePercent: 1.0,
};

describe("PoolDetailsModal", () => {
  it("shows loading state", () => {
    render(
      <PoolDetailsModal
        pool={null}
        isOpen={true}
        isLoading={true}
        onClose={vi.fn()}
      />
    );

    expect(screen.getByTestId("modal-loading")).toBeInTheDocument();
  });

  it("displays pool details correctly", () => {
    render(
      <PoolDetailsModal
        pool={mockPoolDetails}
        isOpen={true}
        isLoading={false}
        onClose={vi.fn()}
      />
    );

    expect(screen.getByText("Test Pool")).toBeInTheDocument();
    expect(screen.getByText("830.5 TH/s")).toBeInTheDocument();
    expect(screen.getByText("1,240")).toBeInTheDocument();
    expect(screen.getByText("1.20%")).toBeInTheDocument();
    expect(screen.getByText("99.82%")).toBeInTheDocument();
    expect(screen.getByText("0.035 BTC")).toBeInTheDocument();
    expect(screen.getByText("Test Location")).toBeInTheDocument();
    expect(screen.getByText("1.0%")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    const { container } = render(
      <PoolDetailsModal
        pool={mockPoolDetails}
        isOpen={false}
        isLoading={false}
        onClose={vi.fn()}
      />
    );

    expect(container.querySelector('[role="dialog"]')).not.toBeInTheDocument();
  });
});
