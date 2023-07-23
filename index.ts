const pythonFile = Bun.file('./index.py')

const server = Bun.serve({
  port: 3031,
  fetch: async request => {
    const pythonCode = await pythonFile.text()
    return new Response(
      /* html */ `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Open Rarity</title>
      <link rel="stylesheet" href="https://pyscript.net/alpha/pyscript.css" />
      <link rel="stylesheet" href="https://unpkg.com/@picocss/pico/css/pico.min.css" />
      <script defer src="https://pyscript.net/alpha/pyscript.js"></script>
    </head>
    <body style="padding: 10px;">
      <py-script>
        ${pythonCode}
      </py-script>
      request headers: <pre>${JSON.stringify(request.headers.toJSON(), undefined, 2)}</pre>
    </body>
    </html>
    `,
      {
        headers: {
          'content-type': 'text/html'
        }
      }
    )
  }
})

console.log(`Listening on http://0.0.0.0:${server.port}`)
