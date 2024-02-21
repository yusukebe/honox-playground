import honox from 'honox/vite'
import { defineConfig } from 'vite'
import { getPlatformProxy } from 'wrangler'

export default defineConfig(async () => {
  const { env, dispose } = await getPlatformProxy()
  return {
    plugins: [
      honox({
        devServer: {
          env,
          plugins: [
            {
              onServerClose: dispose
            }
          ]
        }
      })
    ]
  }
})
