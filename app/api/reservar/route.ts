import { NextResponse } from "next/server";

const WINDOW_MS = 60_000;
const MAX_REQ = 10;
const hits = new Map<string, { count: number; ts: number }>();

function rateLimit(ip: string) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.ts > WINDOW_MS) {
    hits.set(ip, { count: 1, ts: now });
    return true;
  }
  if (rec.count >= MAX_REQ) return false;
  rec.count++;
  return true;
}

export async function POST(req: Request) {
  try {
    const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "0.0.0.0";
    if (!rateLimit(ip)) {
      return NextResponse.json({ result: "error", error: "Too Many Requests" }, { status: 429 });
    }

    const { nombre, telefono, fecha, hora, motivo } = await req.json();
    if (!nombre || !telefono || !fecha || !hora || !motivo) {
      return NextResponse.json({ result: "error", error: "Campos incompletos" }, { status: 400 });
    }

    const scriptUrl = process.env.APPS_SCRIPT_URL!;
    const scriptSecret = process.env.APPS_SCRIPT_SECRET!;
    if (!scriptUrl || !scriptSecret) {
      return NextResponse.json({ result: "error", error: "Server misconfigured" }, { status: 500 });
    }

    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, telefono, fecha, hora, motivo, token: scriptSecret }),
    });

    const data = await res.json().catch(() => ({}));
    if (data?.result !== "success") {
      return NextResponse.json({ result: "error", error: data?.error || "Error Apps Script" }, { status: 500 });
    }

    return NextResponse.json({ result: "success" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ result: "error", error: String(err?.message || err) }, { status: 500 });
  }
}
