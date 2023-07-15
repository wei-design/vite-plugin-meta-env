import type { Plugin } from 'vite'
import type { EnvVars } from './types'

export default function VitePluginMetaEnv(vars: EnvVars, defineOn: string): Plugin
