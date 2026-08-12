"use client";

import { useContent, getAtPath } from "@/lib/content-store";
import { Plus, X } from "lucide-react";

export default function EditableList({
  path,
  as = "li",
  className,
  textClassName,
  prefix,
  placeholder = "New item",
  addLabel = "Add item",
}: {
  path: string;
  as?: any;
  className?: string;
  textClassName?: string;
  prefix?: React.ReactNode;
  placeholder?: string;
  addLabel?: string;
}) {
  const { content, editing, update, addItem, removeItem } = useContent();
  const items: string[] = getAtPath(content, path) ?? [];
  const Tag = as;

  if (!editing) {
    return (
      <>
        {items.map((item, i) => (
          <Tag key={i} className={className}>
            {prefix}
            {item}
          </Tag>
        ))}
      </>
    );
  }

  return (
    <>
      {items.map((item, i) => (
        <Tag
          key={i}
          className={`${className ?? ""} group/edit-item flex items-start gap-2`}
        >
          {prefix}
          <span
            className={`${textClassName ?? ""} flex-1 rounded-[3px] px-1 -mx-1 outline outline-1 outline-dashed outline-acid/40 hover:outline-acid focus:bg-acid/[0.06] focus:outline-2 focus:outline-solid focus:outline-acid`}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              update(`${path}.${i}`, e.currentTarget.textContent ?? "")
            }
          >
            {item}
          </span>
          <button
            type="button"
            onClick={() => removeItem(path, i)}
            className="mt-0.5 shrink-0 text-haze opacity-60 transition-colors hover:text-amber"
            aria-label="Remove item"
          >
            <X size={13} />
          </button>
        </Tag>
      ))}
      <button
        type="button"
        onClick={() => addItem(path, placeholder)}
        className="mt-2 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-acid/80 hover:text-acid"
      >
        <Plus size={12} /> {addLabel}
      </button>
    </>
  );
}
