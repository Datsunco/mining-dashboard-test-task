import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@/tests/test-utils";
import { PoolsTable } from "@/components/mining-pools/PoolsTable";
import { MiningPool } from "@/types/mining-pool";

const mockPools: MiningPool[] = [
  {
    id: "test-1",
    name: "Test Pool 1",
    hashrateTHs: 100.5,
    activeWorkers: 150,
    rejectRate: 0.02,
    status: "online",
  },
  {
    id: "test-2",
    name: "Test Pool 2",
    hashrateTHs: 200.3,
    activeWorkers: 250,
    rejectRate: 0.05,
    status: "degraded",
  },
];

describe("PoolsTable", () => {
  it("renders loading state", () => {
    render(<PoolsTable pools={[]} isLoading={true} onViewDetails={vi.fn()} />);

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("renders table with pools data", () => {
    render(
      <PoolsTable pools={mockPools} isLoading={false} onViewDetails={vi.fn()} />
    );

    expect(screen.getByText("Test Pool 1")).toBeInTheDocument();
    expect(screen.getByText("Test Pool 2")).toBeInTheDocument();
    expect(screen.getByText("100.5")).toBeInTheDocument();
    expect(screen.getByText("200.3")).toBeInTheDocument();
  });

  it("formats reject rate as percentage", () => {
    render(
      <PoolsTable pools={mockPools} isLoading={false} onViewDetails={vi.fn()} />
    );

    expect(screen.getByText("2.00%")).toBeInTheDocument();
    expect(screen.getByText("5.00%")).toBeInTheDocument();
  });

  it("calls onViewDetails when clicking details button", () => {
    const handleViewDetails = vi.fn();

    render(
      <PoolsTable
        pools={mockPools}
        isLoading={false}
        onViewDetails={handleViewDetails}
      />
    );

    const detailsButtons = screen.getAllByText("Подробнее");
    fireEvent.click(detailsButtons[0]);

    expect(handleViewDetails).toHaveBeenCalledWith("test-1");
  });
});
