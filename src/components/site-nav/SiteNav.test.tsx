import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteNav } from "./SiteNav";

describe("SiteNav", () => {
  it("provides a link to home", () => {
    render(<SiteNav />);

    expect(
      screen.getByRole("link", {
        name: /home/i,
      }),
    ).toHaveAttribute("href", "/");
  });
});
