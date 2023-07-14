/**
 * @Author: forguo
 * @Date: 2023/7/15 10:24
 * @Description: index.ts
 */

import type { Plugin, UserConfig } from 'vite'

export interface EnvVars {
    [key: string]: string | null | undefined
}

/**
 * 生成 import.meta.env 环境变量
 * @param {EnvVars} vars
 */
function defineEnvVars(vars: EnvVars) {
    if (!vars) {
        throw new Error('vite-plugin-meta-env: configuration is required.')
    }
    if (toString.call(vars) !== '[object Object]') {
        throw new Error('vite-plugin-meta-env: configuration must be an object.')
    }
    if (Object.keys(vars).length === 0) {
        throw new Error('vite-plugin-meta-env: configuration can not be empty.')
    }
    const metaEnv: Record<string, string | null> = {}
    for (const key in vars) {
        metaEnv[`import.meta.env.${key}`] = JSON.stringify(vars[key])
    }
    return metaEnv
}

/**
 * 使用 define 选项，暴露一个不含前缀的变量
 * https://cn.vitejs.dev/config/shared-options.html#define
 * @param {EnvVars} vars
 */
export default function VitePluginMetaEnv(vars: EnvVars): Plugin {
    return {
        name: 'vite-plugin-meta-env',
        /**
         * // https://cn.vitejs.dev/guide/api-plugin.html#vite-specific-hooks
         * @param {UserConfig} config 原始用户配置
         * @param {ConfigEnv} env 配置环境的变量：包含正在使用的 mode 和 command
         */
        config(): UserConfig {
            // 返回一个将被深度合并到现有配置中的部分配置对象，或者直接改变配置
            return { define: defineEnvVars(vars) }
        }
    }
}
