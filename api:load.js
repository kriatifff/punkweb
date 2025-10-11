// api/load.js
import { kv } from "@vercel/kv";

export const config = { runtime: "edge" };

export default async function handler(req) {
  if (req.method !== "GET") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  try {
    const state = await kv.get("fteplanner:state");
    if (!state) {
      // ничего не сохранено — не затираем фронт пустым объектом
      return new Response(null, { status: 204 });
    }
    return new Response(JSON.stringify(state), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Failed to load" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
