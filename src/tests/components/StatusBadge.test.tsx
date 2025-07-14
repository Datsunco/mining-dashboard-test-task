import { describe, it, expect } from "vitest";
import { render, screen } from "@/tests/test-utils";
import { StatusBadge } from "@/components/mining-pools/StatusBadge";

describe("StatusBadge", () => {
  it("renders online status with correct styling", () => {
    render(<StatusBadge status="online" />);

    const badge = screen.getByText("Online");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-green-100", "text-green-800");
  });

  it("renders degraded status with correct styling", () => {
    render(<StatusBadge status="degraded" />);

    const badge = screen.getByText("Degraded");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-yellow-100", "text-yellow-800");
  });

  it("renders offline status with correct styling", () => {
    render(<StatusBadge status="offline" />);

    const badge = screen.getByText("Offline");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-red-100", "text-red-800");
  });
});
