import { useCallback, useRef, useState } from "react";

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  beforeAlt?: string;
  afterAlt?: string;
}

/** Draggable before/after comparison for the mehendi try-on result. */
const BeforeAfterSlider = ({
  before,
  after,
  beforeAlt = "Try-on से पहले की original photo",
  afterAlt = "AI mehendi try-on के बाद का result",
}: BeforeAfterSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-xl border border-border bg-muted select-none touch-none"
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && updateFromClientX(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <img src={after} alt={afterAlt} className="block w-full" loading="lazy" />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={before}
          alt={beforeAlt}
          className="block h-full w-full object-cover object-left"
          style={{ width: containerRef.current?.clientWidth ?? "100%" }}
          loading="lazy"
        />
      </div>

      <div
        className="absolute inset-y-0 w-0.5 bg-secondary"
        style={{ left: `${position}%` }}
        aria-hidden="true"
      >
        <div className="absolute top-1/2 left-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-secondary bg-background shadow-lg" />
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-label="Before और after compare करने के लिए slider"
        className="absolute inset-x-0 bottom-3 mx-auto w-[85%] cursor-pointer accent-secondary"
      />

      <span className="pointer-events-none absolute left-3 top-3 rounded-md bg-background/80 px-2 py-1 text-xs font-medium text-foreground">
        Before
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-md bg-background/80 px-2 py-1 text-xs font-medium text-foreground">
        After
      </span>
    </div>
  );
};

export default BeforeAfterSlider;
