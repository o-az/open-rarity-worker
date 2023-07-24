import pyConfig from './pyconfig.json'
const pythonFile = Bun.file('./main.py')

export async function handler(_request: Request) {
  const pythonCode = await pythonFile.text()

  const html = /* html */ `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Open Rarity</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300&display=swap');
        * { font-family: 'IBM Plex Mono' !important; color: #fff; }
        body { background: #000; padding: 10px; }
      </style>
      <link rel="stylesheet" href="https://pyscript.net/latest/pyscript.css" />
      <link rel="stylesheet" href="https://unpkg.com/@picocss/pico/css/pico.min.css" />
      <link rel="stylesheet" href="https://unpkg.com/normalize.css/normalize.css">
      <script defer src="https://pyscript.net/latest/pyscript.js"></script>
    </head>
    <body>
      <py-config type="json">
        ${JSON.stringify(pyConfig)}
      </py-config>
      <py-script>
        ${pythonCode}
      </py-script>
      <py-terminal />
    </body>
    </html>
    `
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' }
  })
}

const serve = Bun.serve({ port: 3031, fetch: handler })

console.log(`Serving at http://0.0.0.0:${serve.port}`)
