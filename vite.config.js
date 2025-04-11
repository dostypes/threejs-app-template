import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl'
import fs from 'fs'
import path from 'path'

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'

  return {
    base: isProduction ? '/threejs-app-template/' : '/',
    server: {
      open: true,
      host: true,
      https: {
        key: fs.readFileSync(path.resolve(__dirname, './key.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, './certificate.pem')),
      },
      port: 8080,
    },
    build: {
      outDir: 'dist',
    },
    plugins: [
      glsl({
        include: /\.(glsl|vs|fs)$/,
      }),
    ],
  }
})
