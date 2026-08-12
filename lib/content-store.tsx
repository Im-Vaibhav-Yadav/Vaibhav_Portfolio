"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { SiteContent } from "./schema";

export function getAtPath(obj: any, path: string): any {
  return path
    .split(".")
    .reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

function setAtPath(obj: any, path: string, value: any) {
  const keys = path.split(".");
  const clone: any = structuredClone(obj);
  let cur = clone;
  for (let i = 0; i < keys.length - 1; i++) {
    cur = cur[keys[i]];
  }
  cur[keys[keys.length - 1]] = value;
  return clone;
}

interface Ctx {
  content: SiteContent;
  editing: boolean;
  dirty: boolean;
  saving: boolean;
  savedAt: number | null;
  error: string | null;
  canEdit: boolean;
  toggleEditing: () => void;
  update: (path: string, value: any) => void;
  addItem: (path: string, item: any) => void;
  removeItem: (path: string, index: number) => void;
  save: () => Promise<void>;
  uploadImage: (file: File) => Promise<string>;
}

const ContentContext = createContext<Ctx | null>(null);

export function ContentProvider({
  initial,
  children,
}: {
  initial: SiteContent;
  children: React.ReactNode;
}) {
  const [content, setContent] = useState<SiteContent>(initial);
  const [editing, setEditing] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canEdit = process.env.NODE_ENV !== "production";

  const toggleEditing = useCallback(() => {
    if (!canEdit) return;
    setEditing((v) => !v);
  }, [canEdit]);

  const update = useCallback((path: string, value: any) => {
    setContent((prev) => setAtPath(prev, path, value));
    setDirty(true);
  }, []);

  const addItem = useCallback((path: string, item: any) => {
    setContent((prev) => {
      const clone: any = structuredClone(prev);
      const arr = getAtPath(clone, path);
      arr.push(item);
      return clone;
    });
    setDirty(true);
  }, []);

  const removeItem = useCallback((path: string, index: number) => {
    setContent((prev) => {
      const clone: any = structuredClone(prev);
      const arr = getAtPath(clone, path);
      arr.splice(index, 1);
      return clone;
    });
    setDirty(true);
  }, []);

  const save = useCallback(async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (!res.ok) throw new Error(`Save failed (${res.status})`);
      setDirty(false);
      setSavedAt(Date.now());
    } catch (e: any) {
      setError(e?.message ?? "Save failed");
    } finally {
      setSaving(false);
    }
  }, [content]);

  const uploadImage = useCallback(async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    if (!res.ok) throw new Error(`Upload failed (${res.status})`);
    const data = await res.json();
    return data.path as string;
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      content,
      editing,
      dirty,
      saving,
      savedAt,
      error,
      canEdit,
      toggleEditing,
      update,
      addItem,
      removeItem,
      save,
      uploadImage,
    }),
    [
      content,
      editing,
      dirty,
      saving,
      savedAt,
      error,
      canEdit,
      toggleEditing,
      update,
      addItem,
      removeItem,
      save,
      uploadImage,
    ]
  );

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return ctx;
}
