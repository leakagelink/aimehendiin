import { useCallback, useEffect, useRef, useState } from "react";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const MIN_ZOOM = 1;
const MAX_ZOOM = 6;

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

interface ZoomableImageProps {
  src: string;
  alt: string;
}

/** Generated-design viewer with wheel/pinch zoom, drag pan and control buttons. */
const ZoomableImage = ({ src, alt }: ZoomableImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const stateRef = useRef({ zoom, offset });
  stateRef.current = { zoom, offset };

  // Reset when a new image is shown
  useEffect(() => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }, [src]);

  const zoomAt = useCallback((nextZoomRaw: number, px: number, py: number) => {
    const { zoom: z, offset: o } = stateRef.current;
    const next = clamp(nextZoomRaw, MIN_ZOOM, MAX_ZOOM);
    const k = next / z;
    setZoom(next);
    setOffset(
      next === MIN_ZOOM
        ? { x: 0, y: 0 }
        : { x: px - (px - o.x) * k, y: py - (py - o.y) * k },
    );
  }, []);

  const handleWheelRef = useRef<(e: WheelEvent) => void>(() => {});
  handleWheelRef.current = (e: WheelEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 100 : 1);
    zoomAt(
      stateRef.current.zoom * Math.exp(-dy * 0.0018),
      e.clientX - rect.left,
      e.clientY - rect.top,
    );
  };


  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      handleWheelRef.current(e);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Drag / touch pan
  const dragRef = useRef<{ id: number; x: number; y: number } | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    // Don't hijack clicks on the zoom controls
    if ((e.target as HTMLElement).closest("button")) return;
    if (stateRef.current.zoom <= MIN_ZOOM) return;
    dragRef.current = { id: e.pointerId, x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };


  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    dragRef.current = { id: e.pointerId, x: e.clientX, y: e.clientY };
    setOffset((o) => ({ x: o.x + dx, y: o.y + dy }));
  };

  const endDrag = (e: React.PointerEvent) => {
    if (dragRef.current?.id === e.pointerId) dragRef.current = null;
  };

  const zoomByButton = (factor: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    zoomAt(stateRef.current.zoom * factor, rect.width / 2, rect.height / 2);
  };

  const reset = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden rounded-lg touch-none select-none"
      style={{ cursor: zoom > 1 ? "grab" : "default" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onDoubleClick={() => (zoom > 1 ? reset() : zoomByButton(2))}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="w-full h-full object-contain"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
          transformOrigin: "0 0",
        }}
      />

      {/* Zoom controls */}
      <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-background/85 backdrop-blur-sm border border-border p-1 shadow-card">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 rounded-full"
          onClick={() => zoomByButton(1 / 1.4)}
          disabled={zoom <= MIN_ZOOM}
          aria-label="Zoom out"
        >
          <ZoomOut className="h-4 w-4" aria-hidden="true" />
        </Button>
        <span className="text-[10px] md:text-xs tabular-nums text-muted-foreground w-9 text-center">
          {Math.round(zoom * 100)}%
        </span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 rounded-full"
          onClick={() => zoomByButton(1.4)}
          disabled={zoom >= MAX_ZOOM}
          aria-label="Zoom in"
        >
          <ZoomIn className="h-4 w-4" aria-hidden="true" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 rounded-full"
          onClick={reset}
          disabled={zoom === 1 && offset.x === 0 && offset.y === 0}
          aria-label="Reset zoom"
        >
          <Maximize2 className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
};

export default ZoomableImage;
