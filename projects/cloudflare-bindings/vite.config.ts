import build from '@hono/vite-cloudflare-pages'
import adapter from '@hono/vite-dev-server/cloudflare'
import honox from 'honox/vite'
import { defineConfig } from 'vite'

export default defineConfig(() => {
  return {
    plugins: [
      build(),
      honox({
        devServer: {
          adapter
        }
      })
    ]
  }
})
