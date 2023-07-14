import type { Plugin } from 'vite'
import { EnvVars } from './lib/main'

export function VitePluginMetaEnv(vars: EnvVars): Plugin
