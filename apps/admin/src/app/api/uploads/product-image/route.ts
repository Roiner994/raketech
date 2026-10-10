import { NextResponse } from "next/server";
import { uploadToR2 } from "@/lib/r2/upload";
import { verifyFirebaseIdToken } from "@/lib/verifyFirebaseIdToken";

const MAX_FILE_BYTES = 8 * 1024 * 1024;

function safeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120) || "image.bin";
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization") || "";
    const match = authHeader.match(/^Bearer\s+(.+)$/i);
    if (!match?.[1]) {
      return NextResponse.json({ error: "Missing Authorization bearer token" }, { status: 401 });
    }

    await verifyFirebaseIdToken(match[1]);

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    if (file.size <= 0) {
      return NextResponse.json({ error: "Empty file" }, { status: 400 });
    }

    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json({ error: "File too large (max 8MB)" }, { status: 400 });
    }

    const key = `products/${Date.now()}_${safeFileName(file.name)}`;
    const body = Buffer.from(await file.arrayBuffer());
    const url = await uploadToR2({
      key,
      body,
      contentType: file.type || "application/octet-stream",
    });

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Product image upload failed", error);
    const message = error instanceof Error ? error.message : "Upload failed";
    const authFailed =
      /invalid firebase|invalid_id_token|missing authorization|token/i.test(message);
    const status = authFailed ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
