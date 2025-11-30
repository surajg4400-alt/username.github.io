// Netlify Function — chat proxy (CommonJS)
const fetch = global.fetch || require('node-fetch');

exports.handler = async function(event, context) {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed' };
    }
    const body = JSON.parse(event.body || '{}');
    const { history = [], system = '' } = body;
    const MODEL = process.env.GENERATIVE_MODEL || 'gemini-2.5-flash-preview-09-2025';
    const API_KEY = process.env.GENERATIVE_API_KEY;
    if (!API_KEY) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Missing API key' }) };
    }
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
    const payload = { contents: history, systemInstruction: { parts: [{ text: system }] } };
    const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!r.ok) {
      const text = await r.text().catch(() => '');
      return { statusCode: 502, body: JSON.stringify({ error: 'Upstream error', details: text }) };
    }
    const j = await r.json();
    const text = j.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return { statusCode: 200, body: JSON.stringify({ text }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error', details: err.message }) };
  }
};
