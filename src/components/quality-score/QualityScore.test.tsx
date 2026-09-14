import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { QualityScore } from "./QualityScore";

describe("QualityScore", () => {
  it("renders the label and score", () => {
    render(<QualityScore label="Performance" score={94} />);

    expect(screen.getByText("Performance")).toBeInTheDocument();

    expect(screen.getByText("94")).toBeInTheDocument();
  });

  it("exposes the score semantics as text", () => {
    render(<QualityScore label="Performance" score={94} />);

    expect(screen.getByText(/excellent/i)).toBeInTheDocument();
  });
});
