# vite-plugin-meta-env

English | [简体中文](https://github.com/wei-design/vite-plugin-meta-env/blob/master/readme.zh-CN.md)

[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli)
[![Wei Design](https://img.shields.io/npm/v/vite-plugin-meta-env.svg?style=flat-square)](https://www.npmjs.org/package/vite-plugin-meta-env)

define dynamic env variables in import.meta.env

## 1、Intro

This plugin is used in [vite](https://cn.vitejs.dev/) , Expose **dynamic** or **without prefix** environment variables in the project

### Usage

- a、**dynamic**environment variables

- b、**without prefix**environment variables

---

In `vite` projects, the environment variable is usually exposed which is starting with [envPrefix](https://cn.vitejs.dev/config/shared-options.html#envprefix) The default is `VITE_`,

such as: `VITE_API_URL`, `VITE_APP_NAME` and so on.

But sometimes you need to use some **dynamic environment variables** and **variables without prefix** such as: `APP_VERSION`, `APP_BUILD_TIME` and so on.

This plugin is born to solve this problem.

Here we use the `config` and `define` configuration options unique to `vite` to complete this function

## 2、Usage

### Install

```bash
pnpm add vite-plugin-meta-env -D
```

### Config

`VitePluginMetaEnv` receives two parameters:

```ts
/**
 * Use the define option to expose a variable without a prefix
 * @param {EnvVars} Vars environment variable object
 * @param defineOn Variable Definition Location
 */
```

- The first parameter: environment variable object, `key` is the variable name, `value` is the variable value.
- The second parameter: variable definition location, optional `import.meta.env` or `process.env`

```ts
// vite.config.js

import { defineConfig } from 'vite'

// import plugin
import VitePluginMetaEnv from 'vite-plugin-meta-env'

export default () => {
    // environment variables, object structure
    const metaEnv = {
        APP_VERSION: '1.0.0'
    }
    return defineConfig({
        // ...
        plugins: [
            // use plugin
            VitePluginMetaEnv(metaEnv, 'import.meta.env'),
            // VitePluginMetaEnv(metaEnv, 'process.env'),
        ]
    })
}
```

in the project, you can access the environment variables we defined through `import.meta.env.APP_VERSION`

[demo](https://github.com/wforguo/vue3-quick-start/blob/master/vite.config.ts)

[preview](https://wforguo.github.io/vue3-quick-start/)

## 3、warning

[TypeScript tips](https://cn.vitejs.dev/guide/env-and-mode.html#intellisense)

to ensure type checking and code hints, please add type declarations in `env.d.ts` or `vite-env.d.ts`

```ts
// env.d.ts
/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly BASE_URL: string // Built-in variable
    readonly MODE: string // Built-in variable
    readonly APP_VERSION: string
    // more...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
```

---

[author](https://github.com/wforguo)
