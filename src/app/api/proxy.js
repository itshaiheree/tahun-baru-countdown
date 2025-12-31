// pages/api/proxy.js
export default async function handler(req, res) {
    try{

    const { text, imageUrl, session } = req.query;

    if (!text) {
      return res.status(400).json({ error: "Parameter 'text' wajib diisi" });
    }

    // Prepare body untuk request ke API
    const body = { text };
    if (imageUrl) body.imageUrl = imageUrl;
    if (session) body.session = session;

    const url = new URL('https://api.ryzumi.vip/api/ai/v2/chatgpt');
    url.searchParams.append('text', text);
    if (imageUrl) url.searchParams.append('imageUrl', imageUrl);
    if (session) url.searchParams.append('session', session);
    url.searchParams.append('prompt', 'Anggap kamu adalah Mulyono');

    // GET request
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

  const data = await response.json();
  res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
