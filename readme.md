## 启动

1. 根目录运行 `npm install`
2. 微信开发者工具-工具-构建 npm
3. 根目录运行 `npm run unocss`

## unocss

1. 若要使用 unocss 请运行 `npm run unocss`
2. 组件内使用需添加以下配置
```
Component({
  options: {
    addGlobalClass: true
  }
})
```
