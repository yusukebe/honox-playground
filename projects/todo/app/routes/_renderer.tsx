import { jsxRenderer } from 'hono/jsx-renderer'
import { Script } from 'honox/server'

export default jsxRenderer(({ children, title }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        {import.meta.env.PROD ? (
          <link rel="stylesheet" href="/static/assets/style.css" />
        ) : (
          <link rel="stylesheet" href="/app/style.css" />
        )}
        <Script src="/app/client.ts" async />
      </head>
      <div class="p-4">
        <h1 class="text-4xl font-bold mb-4">
          <a href="/">Todo</a>
        </h1>
        {children}
      </div>
    </html>
  )
})
