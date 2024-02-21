import { jsxRenderer } from 'hono/jsx-renderer'

export default jsxRenderer(({ children }) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
})
