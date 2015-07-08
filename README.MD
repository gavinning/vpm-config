#VPM-CONFIG


安装  

```
npm install vpm-config --save
```

使用  

```
var config = require('vpm-config');

// 设置配置文件路径，必须优先独立配置
config.set('config', path.join(__dirname, 'config.js'));


// config.set 单项配置，覆盖配置，设置配置文件路径
config.set('dir.install', 'packages');

// config.merge 多项配置，合并配置
config.merge({
    name: 'gem',
    dir: {
        install: 'packages'
    }
});

// 获取配置
config.get('dir.install');
// => packages
```
