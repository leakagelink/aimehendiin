import { useCallback, useEffect, useRef, useState } from "react";
import { Camera, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface CameraCaptureProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Receives a JPEG data URL of the captured frame. */
  onCapture: (dataUrl: string) => void;
  maxDimension?: number;
}

/**
 * Live in-page camera preview (getUserMedia) with a shutter button.
 * Nothing is uploaded here — the captured frame is handed back as a data URL.
 */
const CameraCapture = ({ open, onOpenChange, onCapture, maxDimension = 1024 }: CameraCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setReady(false);
  }, []);

  useEffect(() => {
    if (!open) {
      stop();
      return;
    }
    let cancelled = false;

    const start = async () => {
      setError(null);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode, width: { ideal: 1280 }, height: { ideal: 1280 } },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => undefined);
        }
        setReady(true);
      } catch {
        setError(
          "Camera access नहीं मिला। Browser permission allow करें या gallery से photo upload करें।",
        );
      }
    };

    start();
    return () => {
      cancelled = true;
      stop();
    };
  }, [open, facingMode, stop]);

  const capture = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;
    const scale = Math.min(1, maxDimension / Math.max(video.videoWidth, video.videoHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(video.videoWidth * scale);
    canvas.height = Math.round(video.videoHeight * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    onCapture(canvas.toDataURL("image/jpeg", 0.9));
    stop();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>अपने हाथ की live photo लें</DialogTitle>
          <DialogDescription>
            हाथ को frame के बीच में रखें, अच्छी रोशनी में सीधी photo सबसे अच्छा result देती है।
          </DialogDescription>
        </DialogHeader>

        {error ? (
          <p className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">{error}</p>
        ) : (
          <div className="relative overflow-hidden rounded-xl border border-border bg-black">
            <video
              ref={videoRef}
              playsInline
              muted
              className="aspect-[3/4] w-full object-cover"
              aria-label="Live camera preview"
            />
            <div
              className="pointer-events-none absolute inset-6 rounded-2xl border-2 border-dashed border-white/40"
              aria-hidden="true"
            />
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <Button variant="hero" className="flex-1" onClick={capture} disabled={!ready || !!error}>
            <Camera className="h-4 w-4" aria-hidden="true" />
            Capture करें
          </Button>
          <Button
            variant="outline"
            onClick={() => setFacingMode((m) => (m === "environment" ? "user" : "environment"))}
            aria-label="Front aur back camera switch करें"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Camera बदलें
          </Button>
          <Button variant="ghost" onClick={() => onOpenChange(false)} aria-label="Camera बंद करें">
            <X className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CameraCapture;
