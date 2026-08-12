"use client";

import { useRef, useState } from "react";
import { useContent, getAtPath } from "@/lib/content-store";
import { ImagePlus, X, Loader2 } from "lucide-react";

export default function EditableImage({
  path,
  className,
  aspect = "aspect-[16/10]",
  alwaysShow = false,
  emptyLabel = "No image yet",
  rounded = false,
}: {
  path: string;
  className?: string;
  aspect?: string;
  alwaysShow?: boolean;
  emptyLabel?: string;
  /** Circular frame for headshots — skips the square corner brackets. */
  rounded?: boolean;
}) {
  const { content, editing, canEdit, toggleEditing, update, uploadImage } =
    useContent();
  const value = (getAtPath(content, path) ?? "") as string;
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const shape = rounded ? "rounded-full" : "";
  const frame = rounded ? "" : "corner-frame";

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

  if (!editing) {
    if (!value) {
      if (!alwaysShow) return null;
      return (
        <button
          type="button"
          onClick={() => canEdit && toggleEditing()}
          data-cursor-hover={canEdit || undefined}
          className={`${frame} ${shape} group flex flex-col items-center justify-center gap-2 border border-dashed border-line bg-panel/60 text-left ${aspect} ${className ?? ""}`}
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
        className={`${frame} ${shape} group relative overflow-hidden border border-line ${aspect} ${className ?? ""}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={value}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div
      className={`${shape} group relative overflow-hidden border border-dashed border-acid/40 ${aspect} ${className ?? ""}`}
    >
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="h-full w-full object-cover opacity-80" />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-panel/60">
          <ImagePlus size={20} className="text-haze" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-haze">
            {emptyLabel}
          </span>
        </div>
      )}

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
