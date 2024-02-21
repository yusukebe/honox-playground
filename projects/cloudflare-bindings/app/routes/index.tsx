import { createRoute } from 'honox/factory'

export default createRoute((c) => {
  return c.render(<h1>{c.env.MY_VARIABLE}</h1>)
})
