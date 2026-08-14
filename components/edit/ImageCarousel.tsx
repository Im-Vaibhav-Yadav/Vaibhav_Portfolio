"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ImagePlus,
  Loader2,
  Trash2,
} from "lucide-react";
import { useContent, getAtPath } from "@/lib/content-store";

const AUTO_ADVANCE_MS = 4500;

export default function ImageCarousel({
  path,
  aspect = "aspect-[16/10]",
  className,
}: {
  /** Content path to a string[] of image URLs. */
  path: string;
  aspect?: string;
  className?: string;
}) {
  const { content, editing, update, addItem, removeItem, uploadImage } =
    useContent();
  const images = (getAtPath(content, path) as string[]) ?? [];
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const safeIndex = images.length ? Math.min(index, images.length - 1) : 0;

  useEffect(() => {
    if (images.length <= 1 || hovered) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [images.length, hovered]);

  async function handleAdd(file: File | null) {
    if (!file) return;
    setBusy(true);
    try {
      const url = await uploadImage(file);
      addItem(path, url);
      setIndex(images.length); // jump to the new slide
    } catch (e) {
      console.error(e);
    } finally {
      setBusy(false);
    }
  }

  function handleRemove() {
    removeItem(path, safeIndex);
    setIndex((i) => Math.max(0, i - 1));
  }

  if (images.length === 0 && !editing) return null;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`corner-frame group relative overflow-hidden border ${
        editing ? "border-dashed border-acid/40" : "border-line"
      } ${aspect} ${className ?? ""}`}
    >
      {images.length > 0 ? (
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={images[safeIndex]}
            src={images[safeIndex]}
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-panel/60">
          <ImagePlus size={20} className="text-haze" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-haze">
            No images yet
          </span>
        </div>
      )}

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() =>
              setIndex((i) => (i - 1 + images.length) % images.length)
            }
            className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center border border-line bg-ink/70 text-paper opacity-0 transition-opacity group-hover:opacity-100"
            aria-label="Previous image"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % images.length)}
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center border border-line bg-ink/70 text-paper opacity-0 transition-opacity group-hover:opacity-100"
            aria-label="Next image"
          >
            <ChevronRight size={16} />
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === safeIndex ? "w-5 bg-acid" : "w-1.5 bg-ink/70"
                }`}
              />
            ))}
          </div>
        </>
      )}

      {editing && (
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-ink/80 p-2 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex items-center gap-1.5 border border-acid bg-acid px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-ink"
          >
            {busy ? (
              <Loader2 size={11} className="animate-spin" />
            ) : (
              <ImagePlus size={11} />
            )}
            Add
          </button>
          {images.length > 0 && (
            <button
              type="button"
              onClick={handleRemove}
              className="flex items-center gap-1.5 border border-line px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-paper"
            >
              <Trash2 size={11} /> Remove this
            </button>
          )}
          {images.length > 0 && (
            <span className="font-mono text-[10px] text-haze">
              {safeIndex + 1}/{images.length}
            </span>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleAdd(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}
