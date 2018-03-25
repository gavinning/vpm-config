var Config = require('../config')
var config = new Config({a:1})

console.log(1, config)

config.init({
    foo: "bar"
})

console.log(2, config)
console.log(3, config.get())
console.log(4, config.get("foo"))

config.set("app.name", "Vpm-config")
config.set("app.desc", "这是一个配置文件管理器")
config.set("app.background.color", "white")

console.log(5, config.get("app"))
console.log(6, config.get("app.name"))
console.log(7, config.get("app.background.color"))
console.log(8, config.get("app.background.image"))

