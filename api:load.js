// api/load.js
import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  try {
    // один общий ключ для всей команды; хочешь — сделай ключи по «командам/аккаунтам»
    const state = await kv.get("fteplanner:state");
    res.status(200).json(state || {}); // если в KV пусто, возвращаем {}
  } catch (e) {
    res.status(500).json({ error: "Failed to load" });
  }
}
