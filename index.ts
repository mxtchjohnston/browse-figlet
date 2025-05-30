
import { serve } from "bun";
import figlet from "figlet";

const PORT = 3000;

const renderAllFonts = async (text: string | null) => {
  return new Promise<string>((resolve, reject) => {
    figlet.fonts((err, fonts) => {
      if (err) return reject(err);

      const rendered = fonts.map((font) => {
        const line = text || font; // Use query param or fallback to font name
        try {
          const ascii = figlet.textSync(line, { font });
          return `<h2>${font}</h2><pre>${ascii}</pre>`;
        } catch (e) {
          return `<h2>${font}</h2><pre>Error rendering</pre>`;
        }
      });

      resolve(rendered.join("<hr>"));
    });
  });
};

const htmlHeader = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Figlet Fonts</title>
  <style>
    body { font-family: monospace; background: #111; color: #0f0; padding: 1em; }
    h2 { color: #f0f; }
    pre { white-space: pre-wrap; word-wrap: break-word; font-size: 0.75rem; }
    input { background: #000; color: #0f0; border: 1px solid #0f0; padding: 0.5em; width: 80%; }
  </style>
</head>
<body>
  <h1>All Figlet Fonts</h1>
  <form method="get">
    <label for="q">Text to render: </label>
    <input id="q" name="q" type="text" placeholder="Enter text" />
    <button type="submit">Render</button>
  </form>
  <hr />
`;

serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    const queryText = url.searchParams.get("q");

    const body = await renderAllFonts(queryText);
    return new Response(`${htmlHeader}<div id="ascii">${body}</div></body></html>`, {
      headers: { "Content-Type": "text/html" },
    })
  },
});

console.log(`🚀 Server running at http://localhost:${PORT}`);
