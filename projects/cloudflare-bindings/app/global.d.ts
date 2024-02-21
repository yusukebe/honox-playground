import {} from 'hono'

declare module 'hono' {
  interface Env {
    Variables: {}
    Bindings: {
      MY_VARIABLE: string
    }
  }
  interface ContextRenderer {
    (content: string | Promise<string>): Response | Promise<Response>
  }
}
