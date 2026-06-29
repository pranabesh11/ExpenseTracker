import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'


function resolveApiTarget(env: Record<string, string>): string | undefined {
	return env.REACT_APP_API_URL
}
// https://vite.dev/config/
export default defineConfig(({mode})=>{
  const env = loadEnv(mode, process.cwd(), "")
	const apiTarget = resolveApiTarget(env)
  return{
    plugins: [react()],
    server: {
      port:5173,
      open:true,
      proxy:apiTarget? {
        "/billbot":{target: apiTarget, changeOrigin:true}
      }: undefined
    }
  }
})
