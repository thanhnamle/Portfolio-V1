export const DIALOG_MAX_WIDTH = 768;

export type DialogOrigin = { x: number; y: number; scale: number };

// Offset and scale that place the centred dialog exactly over the clicked card,
// so animating to x/y 0 and scale 1 reads as the card zooming open.
export const originFromRect = (rect: DOMRect): DialogOrigin => {
  const panelWidth = Math.min(DIALOG_MAX_WIDTH, window.innerWidth - 32);
  return {
    x: rect.left + rect.width / 2 - window.innerWidth / 2,
    y: rect.top + rect.height / 2 - window.innerHeight / 2,
    scale: Math.min(1, rect.width / panelWidth),
  };
};
