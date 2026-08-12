"use client";

import { useContent, getAtPath } from "@/lib/content-store";

type Tag = "span" | "p" | "h1" | "h2" | "h3" | "h4" | "div" | "li";

export default function Editable({
  path,
  as = "span",
  className,
  multiline = false,
}: {
  path: string;
  as?: Tag;
  className?: string;
  multiline?: boolean;
}) {
  const { content, editing, update } = useContent();
  const value = (getAtPath(content, path) ?? "") as string;
  const Tag = as as any;

  if (!editing) {
    return <Tag className={className}>{value}</Tag>;
  }

  return (
    <Tag
      className={`${className ?? ""} rounded-[3px] px-1 -mx-1 outline outline-1 outline-dashed outline-acid/40 transition-colors hover:outline-acid focus:bg-acid/[0.06] focus:outline-2 focus:outline-solid focus:outline-acid`}
      style={multiline ? { whiteSpace: "pre-wrap" } : undefined}
      contentEditable
      suppressContentEditableWarning
      onBlur={(e: React.FocusEvent<HTMLElement>) =>
        update(path, e.currentTarget.textContent ?? "")
      }
      onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
        if (!multiline && e.key === "Enter") {
          e.preventDefault();
          (e.currentTarget as HTMLElement).blur();
        }
      }}
    >
      {value}
    </Tag>
  );
}
