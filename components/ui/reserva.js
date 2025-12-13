export async function POST(req) {
  try {
    const data = await req.json();
    if (!data.nombre || !data.telefono || !data.fecha || !data.hora || !data.motivo) {
      return new Response(JSON.stringify({ error: "Faltan datos" }), { status: 400 });
    }
    // Reenvía al webhook de n8n:
    const response = await fetch("https://lucasmircoli25.app.n8n.cloud/webhook-test/ReceiveForm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Error en n8n" }), { status: 502 });
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Error interno" }), { status: 500 });
  }
}
