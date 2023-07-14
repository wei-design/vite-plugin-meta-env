# vite-plugin-meta-env

[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli)
[![Wei Design](https://img.shields.io/npm/v/vite-plugin-meta-env.svg?style=flat-square)](https://www.npmjs.org/package/vite-plugin-meta-env)

define dynamic env variables in import.meta.env

## 一、介绍

该插件：用于在 [vite](https://cn.vitejs.dev/) 项目中暴露**动态的**或者**不含前缀**的环境变量

### 使用场景

- 1、**动态**的环境变量

- 2、**不含前缀**的环境变量

---

在 `vite` 项目当中，通常会暴露 [envPrefix](https://cn.vitejs.dev/config/shared-options.html#envprefix) 【默认为 `VITE_`】开头的环境变量，

如：`VITE_API_URL`，`VITE_APP_NAME` 等等。

有时候则需要使用到一些**动态的环境变量**，以及**不含前缀的变量**如：`APP_VERSION`，`APP_BUILD_TIME` 等等。

本插件就是为了解决这个问题而生的。

这里使用了 `vite` 独有钩子：[config](https://cn.vitejs.dev/guide/api-plugin.html#config) 以及 [define](https://cn.vitejs.dev/config/shared-options.html#define) 配置选项来完成该功能

## 二、使用

- 安装

```bash
pnpm i -D vite-plugin-meta-env
```

- 配置

`VitePluginMetaEnv` 接收一个对象作为参数，对象的 key 为变量名，value 为变量值。

```ts
// vite.config.js

import { defineConfig } from 'vite'

// 引入插件
import VitePluginMetaEnv from 'vite-plugin-meta-env'

export default () => {
    // 环境变量，对象结构
    const metaEnv = {
        APP_VERSION: '1.0.0'
    }
    return defineConfig({
        // ...
        plugins: [
            // 添加插件
            VitePluginMetaEnv(metaEnv)
        ]
    })
}
```

在项目当中就可以通过 `import.meta.env.APP_VERSION` 来访问我们定义的环境变量了

[demo](https://github.com/wforguo/vue3-quick-start/blob/master/vitest.config.ts)

[预览](https://wforguo.github.io/vue3-quick-start/)

## 三、注意项

[TypeScript 的智能提示](https://cn.vitejs.dev/guide/env-and-mode.html#intellisense)

对于使用 TypeScript 的开发者来说，请确保在 env.d.ts 或 vite-env.d.ts 文件中添加类型声明，以获得类型检查以及代码提示。

```ts
// env.d.ts
/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly BASE_URL: string // 内建变量
    readonly MODE: string // 内建变量
    readonly APP_VERSION: string
    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
```

---

[author](https://github.com/wforguo)
