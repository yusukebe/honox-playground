import honox from 'honox/vite'
import { defineConfig } from 'vite'
import { getPlatformProxy } from 'wrangler'

export default defineConfig(async ({ mode }) => {
  const proxy = await getPlatformProxy()
  return {
    plugins: [
      honox({
        devServer: {
          env: proxy.env
        }
      })
    ]
  }
})
