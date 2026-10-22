import { beforeEach, describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "@/App";
import { intro, profile, projects, sections } from "@/data/profile";

// Renders the app, skips the loading screen and returns once the intro is up.
const renderIntro = async () => {
  const utils = render(<App />);
  fireEvent.keyDown(window, { key: "Enter" });
  await screen.findByRole("button", { name: "Enter portfolio" });
  return utils;
};

// Walks past loading and the intro into the portfolio.
const renderPortfolio = async () => {
  const utils = await renderIntro();
  fireEvent.click(screen.getByRole("button", { name: "Enter portfolio" }));
  await screen.findByRole("heading", { level: 1, name: /Hi, I'm Nam/ });
  return utils;
};

beforeEach(() => {
  sessionStorage.clear();
  window.history.replaceState(null, "", "/");
  // index.html's inline script defaults to the dark theme; mirror it.
  document.documentElement.className = "dark";
});

describe("Loading", () => {
  it("is shown first and can be skipped with a key press", async () => {
    render(<App />);
    expect(screen.getByRole("status", { name: /Loading/ })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Enter portfolio" })).not.toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(await screen.findByRole("button", { name: "Enter portfolio" })).toBeInTheDocument();
  });
});

describe("Intro", () => {
  it("follows loading with the headline, signature and enter button", async () => {
    await renderIntro();
    expect(screen.getByRole("heading", { level: 1, name: new RegExp(intro.headline[0], "i") })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: profile.name })).toBeInTheDocument();
    expect(document.getElementById("projects")).not.toBeInTheDocument();
  });

  it("enters the portfolio on Enter when nothing is focused", async () => {
    await renderIntro();
    fireEvent.keyDown(window, { key: "Enter" });
    expect(await screen.findByRole("heading", { level: 1, name: /Hi, I'm Nam/ })).toBeInTheDocument();
  });

  it("enters the portfolio when the visitor scrolls down", async () => {
    await renderIntro();
    fireEvent.wheel(window, { deltaY: 120 });
    expect(await screen.findByRole("heading", { level: 1, name: /Hi, I'm Nam/ })).toBeInTheDocument();
  });

  it("still plays loading and intro for a link to a section, then opens on that section", async () => {
    window.history.replaceState(null, "", "/#projects");
    const scrollIntoView = vi.spyOn(Element.prototype, "scrollIntoView");
    render(<App />);
    expect(screen.getByRole("status", { name: /Loading/ })).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });
    fireEvent.click(await screen.findByRole("button", { name: "Enter portfolio" }));
    await screen.findByRole("heading", { level: 1, name: /Hi, I'm Nam/ });
    expect(scrollIntoView.mock.contexts).toContain(document.getElementById("projects"));
    scrollIntoView.mockRestore();
  });

  it("plays loading and intro again after a reload", async () => {
    const { unmount } = await renderPortfolio();
    unmount();
    render(<App />);
    expect(screen.getByRole("status", { name: /Loading/ })).toBeInTheDocument();
  });
});

describe("Portfolio", () => {
  it("renders every navigable section", async () => {
    const { container } = await renderPortfolio();
    for (const { id } of sections) {
      expect(container.querySelector(`#${id}`)).toBeInTheDocument();
    }
  });

  it("renders all projects and the contact email", async () => {
    await renderPortfolio();
    for (const project of projects) {
      expect(screen.getByRole("heading", { name: project.title })).toBeInTheDocument();
    }
    expect(screen.getAllByRole("link", { name: new RegExp(profile.email) }).length).toBeGreaterThan(0);
  });

  it("hides project links that are not set", async () => {
    await renderPortfolio();
    const expected = projects.filter((p) => p.github).length;
    expect(screen.queryAllByRole("link", { name: "Source" })).toHaveLength(expected);
  });

  it("offers only light and dark, and keeps every switcher in sync", async () => {
    await renderPortfolio();
    expect(screen.queryByRole("button", { name: /Fantasy/ })).not.toBeInTheDocument();

    const [first, second] = screen.getAllByRole("button", { name: "Light theme" });
    fireEvent.click(first);
    expect(document.documentElement).not.toHaveClass("dark");
    await waitFor(() => expect(second).toHaveAttribute("aria-pressed", "true"));

    fireEvent.click(screen.getAllByRole("button", { name: "Dark theme" })[0]);
    expect(document.documentElement).toHaveClass("dark");
  });

  it("opens a project dialog and closes it with Escape", async () => {
    await renderPortfolio();
    const [first] = projects;
    fireEvent.click(screen.getByRole("button", { name: `View details: ${first.title}` }));

    const dialog = await screen.findByRole("dialog", { name: first.title });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close project details" })).toHaveFocus();

    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("shows organisation logos in the timeline", async () => {
    await renderPortfolio();
    expect(screen.getAllByAltText(/Swinburne/).length).toBeGreaterThan(0);
    expect(screen.getAllByAltText(/Payoo/).length).toBeGreaterThan(0);
  });
});
