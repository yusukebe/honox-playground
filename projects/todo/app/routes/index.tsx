import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'
import Todo from '../islands/todo'
import type { Todo as TodoType } from '../types'

const app = new Hono<{
  Bindings: {
    DB: D1Database
  }
}>()
  .get('/', async (c) => {
    const { results } = await c.env.DB.prepare('SELECT id, title from todos').all<TodoType>()
    const todos = results
    return c.render(<Todo initialTodos={todos} />)
  })
  .post(
    '/',
    zValidator(
      'json',
      z.object({
        title: z.string()
      })
    ),
    async (c) => {
      const { title } = c.req.valid('json')
      const id = crypto.randomUUID()
      await c.env.DB.prepare('INSERT INTO todos(id, title) VALUES(?, ?);').bind(id, title).run()
      return c.json({
        id,
        title
      })
    }
  )
  .delete('/', zValidator('json', z.object({ id: z.string() })), async (c) => {
    const { id } = c.req.valid('json')
    await c.env.DB.prepare('DELETE FROM todos WHERE id = ?').bind(id).run()
    return c.json({ id })
  })

export type AppType = typeof app

export default app
