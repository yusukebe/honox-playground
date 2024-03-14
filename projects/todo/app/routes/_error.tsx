import type { ErrorHandler } from 'hono'

const handler: ErrorHandler = (e, c) => {
  console.log(e.message)
  return c.render(<h1>Internal Server Error</h1>)
}

export default handler
