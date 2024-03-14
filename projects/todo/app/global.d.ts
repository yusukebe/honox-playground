import {} from 'hono'

type Head = {
  title?: string
}

declare module 'hono' {
  interface ContextRenderer {
    (content: string | Promise<string>, head?: Head): Response | Promise<Response>
  }
}
