import { describe, it, expect } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "@/App";
import { profile, projects, sections } from "@/data/profile";

describe("App", () => {
  it("renders every navigable section", () => {
    const { container } = render(<App />);
    for (const { id } of sections) {
      expect(container.querySelector(`#${id}`)).toBeInTheDocument();
    }
  });

  it("renders all projects and the contact email", () => {
    render(<App />);
    for (const project of projects) {
      expect(screen.getByRole("heading", { name: project.title })).toBeInTheDocument();
    }
    expect(screen.getAllByRole("link", { name: new RegExp(profile.email) }).length).toBeGreaterThan(0);
  });

  it("hides project links that are not set", () => {
    render(<App />);
    const expected = projects.filter((p) => p.github).length;
    expect(screen.queryAllByRole("link", { name: "Source" })).toHaveLength(expected);
  });

  it("keeps every theme toggle in sync", async () => {
    render(<App />);
    const [first, second] = screen.getAllByRole("button", { name: /switch to dark theme/i });
    fireEvent.click(first);
    expect(document.documentElement).toHaveClass("dark");
    await waitFor(() => expect(second).toHaveAccessibleName(/switch to light theme/i));
  });
});
