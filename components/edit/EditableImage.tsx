"use client";

import { useEffect, useRef, useState } from "react";
import { useContent, getAtPath } from "@/lib/content-store";
import { ImagePlus, X, Loader2, Move, Check, RotateCcw, ZoomIn } from "lucide-react";

export default function EditableImage({
  path,
  className,
  aspect = "aspect-[16/10]",
  alwaysShow = false,
  emptyLabel = "No image yet",
  rounded = false,
  zoomPath,
  xPath,
  yPath,
}: {
  path: string;
  className?: string;
  aspect?: string;
  alwaysShow?: boolean;
  emptyLabel?: string;
  /** Circular frame for headshots — skips the square corner brackets. */
  rounded?: boolean;
  /** Content paths for zoom/position — supplying all three enables the
   *  drag-to-pan + zoom "Adjust" control. */
  zoomPath?: string;
  xPath?: string;
  yPath?: string;
}) {
  const { content, editing, canEdit, toggleEditing, update, uploadImage } =
    useContent();
  const value = (getAtPath(content, path) ?? "") as string;
  const zoom = zoomPath ? (getAtPath(content, zoomPath) as number) ?? 1 : 1;
  const posX = xPath ? (getAtPath(content, xPath) as number) ?? 50 : 50;
  const posY = yPath ? (getAtPath(content, yPath) as number) ?? 50 : 50;
  const canAdjust = !!(zoomPath && xPath && yPath);

  const inputRef = useRef<HTMLInputElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);
  const [adjusting, setAdjusting] = useState(false);
  const shape = rounded ? "rounded-full" : "";
  const frameClass = rounded ? "" : "corner-frame";

  const dragState = useRef<{
    startClientX: number;
    startClientY: number;
    startX: number;
    startY: number;
  } | null>(null);

  useEffect(() => {
    if (!adjusting) return;

    function onMove(e: PointerEvent) {
      if (!dragState.current || !frameRef.current) return;
      const rect = frameRef.current.getBoundingClientRect();
      const dx = e.clientX - dragState.current.startClientX;
      const dy = e.clientY - dragState.current.startClientY;
      const scale = Math.max(zoom, 1);
      const nextX = clamp(
        dragState.current.startX - (dx / rect.width) * (100 / scale),
        0,
        100
      );
      const nextY = clamp(
        dragState.current.startY - (dy / rect.height) * (100 / scale),
        0,
        100
      );
      if (xPath) update(xPath, Math.round(nextX));
      if (yPath) update(yPath, Math.round(nextY));
    }
    function onUp() {
      dragState.current = null;
    }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adjusting, zoom, xPath, yPath]);

  async function handleFile(file: File | null) {
    if (!file) return;
    setBusy(true);
    try {
      const url = await uploadImage(file);
      update(path, url);
    } catch (e) {
      console.error(e);
    } finally {
      setBusy(false);
    }
  }

  const imgStyle = {
    objectFit: "cover" as const,
    objectPosition: `${posX}% ${posY}%`,
    transform: `scale(${zoom})`,
  };

  if (!editing) {
    if (!value) {
      if (!alwaysShow) return null;
      return (
        <button
          type="button"
          onClick={() => canEdit && toggleEditing()}
          data-cursor-hover={canEdit || undefined}
          className={`${frameClass} ${shape} group flex flex-col items-center justify-center gap-2 border border-dashed border-line bg-panel/60 text-left ${aspect} ${className ?? ""}`}
        >
          <ImagePlus size={20} className="text-haze" />
          <span className="px-2 text-center font-mono text-[10px] uppercase tracking-widest text-haze">
            {canEdit ? emptyLabel : "Photo coming soon"}
          </span>
        </button>
      );
    }
    return (
      <div
        className={`${frameClass} ${shape} group relative overflow-hidden border border-line ${aspect} ${className ?? ""}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={value}
          alt=""
          style={imgStyle}
          className="h-full w-full transition-transform duration-500"
        />
      </div>
    );
  }

  // ---- editing mode ----
  return (
    <div className="inline-flex flex-col items-start gap-2">
      <div
        ref={frameRef}
        className={`${shape} group relative overflow-hidden border border-dashed border-acid/40 ${aspect} ${className ?? ""} ${adjusting ? "cursor-grab active:cursor-grabbing" : ""}`}
        onPointerDown={(e) => {
          if (!adjusting) return;
          e.preventDefault();
          dragState.current = {
            startClientX: e.clientX,
            startClientY: e.clientY,
            startX: posX,
            startY: posY,
          };
        }}
      >
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt=""
            style={imgStyle}
            draggable={false}
            className={`h-full w-full select-none ${adjusting ? "" : "opacity-80"}`}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-panel/60">
            <ImagePlus size={20} className="text-haze" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-haze">
              {emptyLabel}
            </span>
          </div>
        )}

        {!adjusting && (
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-ink/70 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-1.5 border border-acid bg-acid px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-ink"
            >
              {busy ? (
                <Loader2 size={12} className="animate-spin" />
              ) : (
                <ImagePlus size={12} />
              )}
              {value ? "Replace" : "Upload"}
            </button>
            {value && canAdjust && (
              <button
                type="button"
                onClick={() => setAdjusting(true)}
                className="flex items-center gap-1.5 border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-paper"
              >
                <Move size={12} /> Adjust
              </button>
            )}
            {value && (
              <button
                type="button"
                onClick={() => update(path, "")}
                className="flex items-center gap-1.5 border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-paper"
              >
                <X size={12} /> Remove
              </button>
            )}
          </div>
        )}
      </div>

      {adjusting && (
        <div className="w-full max-w-[220px] space-y-2 border border-line bg-panel p-3">
          <div className="flex items-center gap-2">
            <ZoomIn size={12} className="shrink-0 text-haze" />
            <input
              type="range"
              min={1}
              max={3}
              step={0.05}
              value={zoom}
              onChange={(e) =>
                zoomPath && update(zoomPath, parseFloat(e.target.value))
              }
              className="w-full accent-acid"
            />
          </div>
          <p className="font-mono text-[9px] uppercase tracking-widest text-haze">
            Drag photo to reposition
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                if (zoomPath) update(zoomPath, 1);
                if (xPath) update(xPath, 50);
                if (yPath) update(yPath, 50);
              }}
              className="flex flex-1 items-center justify-center gap-1 border border-line px-2 py-1.5 font-mono text-[10px] uppercase tracking-widest text-haze hover:text-paper"
            >
              <RotateCcw size={11} /> Reset
            </button>
            <button
              type="button"
              onClick={() => setAdjusting(false)}
              className="flex flex-1 items-center justify-center gap-1 border border-acid bg-acid px-2 py-1.5 font-mono text-[10px] uppercase tracking-widest text-ink"
            >
              <Check size={11} /> Done
            </button>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
