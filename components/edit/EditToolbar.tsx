"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Save, X, Check, Loader2, AlertTriangle } from "lucide-react";
import { useContent } from "@/lib/content-store";

export default function EditToolbar() {
  const { canEdit, editing, toggleEditing, dirty, saving, savedAt, error, save } =
    useContent();
  const [showHint, setShowHint] = useState(true);

  if (!canEdit) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3">
      <AnimatePresence>
        {editing && showHint && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="max-w-xs border border-acid/40 bg-ink/95 p-3 font-mono text-[11px] leading-relaxed text-haze shadow-xl"
          >
            <button
              onClick={() => setShowHint(false)}
              className="absolute right-2 top-2 text-haze hover:text-paper"
              aria-label="Dismiss"
            >
              <X size={12} />
            </button>
            <p className="pr-4">
              Click any dashed-outline text or image to edit it in place. Hit{" "}
              <span className="text-acid">Save</span> when you&apos;re done —
              it writes straight into{" "}
              <code className="text-acid">content/site.json</code>. Commit
              &amp; push to publish.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2 border border-line bg-ink/95 p-2 shadow-2xl backdrop-blur">
        {editing && (
          <button
            onClick={save}
            disabled={!dirty || saving}
            data-cursor-hover
            className="flex items-center gap-2 border border-acid bg-acid px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-ink disabled:cursor-not-allowed disabled:border-line disabled:bg-transparent disabled:text-haze"
          >
            {saving ? (
              <Loader2 size={13} className="animate-spin" />
            ) : error ? (
              <AlertTriangle size={13} />
            ) : savedAt && !dirty ? (
              <Check size={13} />
            ) : (
              <Save size={13} />
            )}
            {saving
              ? "Saving…"
              : error
              ? "Retry save"
              : savedAt && !dirty
              ? "Saved"
              : "Save changes"}
          </button>
        )}
        <button
          onClick={toggleEditing}
          data-cursor-hover
          className={`flex items-center gap-2 px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors ${
            editing
              ? "border border-line text-paper hover:border-amber hover:text-amber"
              : "border border-acid/50 text-acid hover:border-acid"
          }`}
        >
          {editing ? <X size={13} /> : <Pencil size={13} />}
          {editing ? "Exit edit mode" : "Edit this page"}
        </button>
      </div>
    </div>
  );
}
