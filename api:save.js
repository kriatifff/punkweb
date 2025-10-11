// api/save.js
import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  try {
    const body = await getBody(req);
    // простая валидация: ждём объект
    if (!body || typeof body !== "object") {
      return res.status(400).json({ error: "Invalid body" });
    }
    await kv.set("fteplanner:state", body);
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: "Failed to save" });
  }
}

function getBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => {
      try { resolve(JSON.parse(data || "{}")); }
      catch (e) { reject(e); }
    });
    req.on("error", reject);
  });
}
