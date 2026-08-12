import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { isLocalEditRequest } from "@/lib/dev-guard";

const CONTENT_PATH = path.join(process.cwd(), "content", "site.json");

export async function POST(req: NextRequest) {
  if (!isLocalEditRequest(req)) {
    return NextResponse.json(
      { error: "Editing is only available when running locally." },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    await fs.writeFile(
      CONTENT_PATH,
      JSON.stringify(body, null, 2) + "\n",
      "utf-8"
    );
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Failed to save content" },
      { status: 500 }
    );
  }
}
