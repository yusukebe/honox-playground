import { css } from 'hono/css'
import { createRoute } from 'honox/factory'
import Component from '../islands/component'

const className = css`
  font-family: sans-serif;
`

export default createRoute((c) => {
  return c.render(
    <div class={className}>
      <Component />
    </div>
  )
})
