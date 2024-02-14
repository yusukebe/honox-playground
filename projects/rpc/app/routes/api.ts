import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'

const app = new Hono()

const schema = z.object({
  name: z.string()
})

const routes = app.get('/echo', zValidator('query', schema), (c) => {
  const { name } = c.req.valid('query')
  return c.json({ message: `Hello, ${name}! from API` })
})

export type AppType = typeof routes

export default app
