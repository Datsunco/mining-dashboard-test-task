import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@/tests/test-utils";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useTheme } from "next-themes";

// Mock уже настроен в setup.ts
describe("ThemeToggle", () => {
  it("renders theme toggle button", () => {
    render(<ThemeToggle />);

    const button = screen.getByRole("button", { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
  });

  it("shows sun icon in light mode", () => {
    render(<ThemeToggle />);

    const sunIcon = screen.getByTestId("sun-icon");
    expect(sunIcon).toHaveClass("scale-100");
  });

  it("toggles theme on click", () => {
    const setTheme = vi.fn();

    vi.mocked(useTheme).mockReturnValue({
      theme: "light",
      setTheme: setTheme,
      themes: ["light", "dark"],
      resolvedTheme: "light",
    });

    render(<ThemeToggle />);

    const button = screen.getByRole("button", { name: /toggle theme/i });
    fireEvent.click(button);

    expect(setTheme).toHaveBeenCalledWith("dark");
  });
});
