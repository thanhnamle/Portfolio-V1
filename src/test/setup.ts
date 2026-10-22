import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// jsdom has no IntersectionObserver; used by useActiveSection and framer-motion's whileInView.
class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

Object.defineProperty(window, "IntersectionObserver", { writable: true, value: IntersectionObserverStub });

// jsdom has no ResizeObserver either; used to route the stack diagram wires.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, "ResizeObserver", { writable: true, value: ResizeObserverStub });

// jsdom doesn't implement scrolling; App scrolls to top after the intro exits.
Object.defineProperty(window, "scrollTo", { writable: true, value: () => {} });
