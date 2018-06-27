# Config

配置文件管理


### Install

```sh
npm i vpm-config
```


### Usage
```javascript
const Config = require('vpm-config')
const config = new Config({})
```
### Example
```javascript
config.set('dev.db.username', 'root')
config.set('dev.db.password', 'root')

config.get('dev.db.username')
config.get('dev.db.password')
```  

```js
config.merge({
    app: {
        name: 'name',
        logo: 'logo',
        tags: [1,2,3],
        mods: {
            foo: 'bar'
        }
    }
})

config.get('app.name')
config.get('app.mods.foo')
```

```js
config.merge('app.mods', {
    bar: 'foo'
})

config.get('app.mods')
```

> npm run test