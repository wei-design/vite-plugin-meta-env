import './style.css'
import { name, version, homepage, description } from '../package.json'

// 这里的 import.meta.env 就是我们在 vite.config.ts 中定义的环境变量
console.log(import.meta.env)

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div>
    <a href="https://wei-design.github.io" target="_blank">
        <img src="/favicon.png" class="logo" alt="Vite logo" />
    </a>
    <h2>${name}<samp class="version">v${version}</samp></h2>
    <div class="read-the-docs">${description}</div>
    <div>
        用于在 <code>vite</code> 项目中暴露 <strong>动态的</strong> 或者 <strong>不含前缀</strong> 的环境变量
    </div>
    <div class="card">
        <a href="${homepage}" target="_blank">
            <button type="button">Start</button>
        </a>
    </div>
</div>
`
