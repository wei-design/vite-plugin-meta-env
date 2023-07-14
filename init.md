# vite + ts + eslint + prettier

## vite

```bash
pnpm create vite
```

## eslint + prettier

这里只做 vite + ts + eslint + prettier 的配置

### eslint

#### 安装

```bash
pnpm add eslint -D
```

#### 配置

```bash
pnpm eslint --init
```

如下：
```
You can also run this command directly using 'npm init @eslint/config'.
npx: installed 41 in 3.421s
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser
✔ What format do you want your config file to be in? · JavaScript
The config that you've selected requires the following dependencies:

@typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
✔ Would you like to install them now? · No / Yes
✔ Which package manager do you want to use? · pnpm
Installing @typescript-eslint/eslint-plugin@latest, @typescript-eslint/parser@latest
Packages: +32
++++++++++++++++++++++++++++++++
Progress: resolved 168, reused 138, downloaded 0, added 0, done

devDependencies:
+ @typescript-eslint/eslint-plugin 6.0.0
+ @typescript-eslint/parser 6.0.0
Successfully created .eslintrc.cjs file in /Users/forguo/work/wei/projects/vite-plugin-meta-env
```

- 在 `.eslintrc.cjs` 中 env 添加如下配置：

```js
{
    // ++
    node: true
}
```

- 在 `package.json` 中添加如下配置：

// eslint . 为指定lint当前项目中的文件
// --ext 为指定lint哪些后缀的文件
// --fix 开启自动修复

```json
{
    "scripts": {
        "lint": "eslint . --ext .js,.ts --fix --ignore-path .gitignore"
    }
}
```

### prettier

#### 安装

```bash

pnpm add prettier -D
```

#### 配置

- 在根目录下新建 `.prettierrc.cjs` 文件，添加如下配置：

```js
module.exports = {
    $schema: 'https://json.schemastore.org/prettierrc',
    printWidth: 120, // 单行输出（不折行）的（最大）长度
    semi: false, // 结尾使用分号, 默认true
    useTabs: false, // 使用tab缩进，默认false
    tabWidth: 4, // tab缩进大小,默认为2
    singleQuote: true, // 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
    jsxSingleQuote: true, // jsx 不使用单引号，而使用双引号
    trailingComma: 'none', // 行尾逗号,默认none,可选 none|es5|all es5 包括es5中的数组、对象，all 包括函数对象等所有可选
    bracketSpacing: true, // 对象中的空格 默认true，true: { foo: bar }，false: {foo: bar}
    htmlWhitespaceSensitivity: 'ignore', // 指定 HTML 文件的全局空白区域敏感度, "ignore" - 空格被认为是不敏感的
    jsxBracketSameLine: false,
    arrowParens: 'avoid', // 箭头函数参数括号 默认avoid 可选 avoid| always， avoid 能省略括号的时候就省略 例如x => x，always 总是有括号
    proseWrap: 'always' // 当超出print width（上面有这个参数）时就折行
}
```

- 在 `package.json` 中添加如下配置：

```json
{
    "scripts": {
        "format": "prettier --write ."
    }
}
```

### 解决eslint与prettier的冲突

> eslint负责我们的代码质量，prettier负责我们的代码格式。但是会存在eslint有部分规则与prettier冲突了，保存的时候显示运行了eslint的修复命令，然后再运行prettier格式化，所以就会出现屏幕闪一下然后又恢复到报错的现象。
查阅资料会发现，社区已经为我们提供了一个非常成熟的方案，即eslint-config-prettier + eslint-plugin-prettier。

- eslint-plugin-prettier： 基于 prettier 代码风格的 eslint 规则，即eslint使用pretter规则来格式化代码。

- eslint-config-prettier： 禁用所有与格式相关的 eslint 规则，解决 prettier 与 eslint 规则冲突，确保将其放在 extends 队列最后，这样它将覆盖其他配置

#### 安装

```bash
pnpm add eslint-plugin-prettier eslint-config-prettier -D
```

#### 配置

- 在 `.eslintrc.cjs` 中 `extends` 添加如下配置：

```js
[
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // +++，需在最后
    'plugin:prettier/recommended'
]
```
