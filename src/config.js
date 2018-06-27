/**
 * VPM-Config
 * @author gavinning
 * @homepage http://github.com/gavinning/vpm-config
 */

const is = require('aimee-is')
const extend = require('aimee-extend')

class Config {
    constructor(config) {
        this.__config = is.plainObject(config) ? config : {}
    }

    /**
     * 单项配置设置，覆盖模式，推荐只用于单项配置
     * @param   {String | Object}  key 属性
     * @param   {Any} value 属性值
     */
    set(key, value) {
        try {
            eval('this.__config.' + key + ' = value')
        } catch (e) {
            this.__config = Config.create(this.__config, key, value)
        }
    }

    /**
     * 获取配置
     * @param   {String}  key 属性
     * @param   {boolean}  isNotClone 可选 false 是否返回副本 只有key不存在时生效
     * @return  {Any}     属性值
     */
    get(key, isNotClone = false) {
        if (typeof key === 'boolean') {
            isNotClone = key
            key = null
        }

        if (!key) {
            return isNotClone ? this.__config : extend(true, {}, this.__config)
        }

        try {
            return eval('this.__config.' + key) 
        } catch (e) {
            return undefined
        }
    }

    /**
     * 多项配置设置，合并模式，推荐使用多项配置
     * @param   {String}   key   合并的属性节点
     * @param   {Any}   value 合并的对象map
     */
    merge(key, value) {
        // 合并配置
        if (is.plainObject(key)) {
            return extend(true, this.__config, key)
        }

        // 合并到指定节点
        if (key) {
            let tmp = Config.create({}, key, value);
            return extend(true, this.__config, tmp);
        }
    }

    clean(config) {
        this.__config = config || {}
    }

    /**
     * 递归创建不存在子节点为空对象
     * @param   {Object}  target   目标对象
     * @param   {String}  key      要操作的key
     * @param   {anyType} value    target.key
     * @return  {Object}           target
     * @example this.create({}, 'app.path', __dirname)
     */
    static create(target, key, value) {
        let prop
        let data = target = target || {}
        let arr = key.split('.')
    
        do {
            prop = arr.shift()
            data[prop] = data[prop] || {}
            data = data[prop]
        }
        while (arr.length > 1)
    
        // 检查是否存在value
        if (value) {
            // 节点创建完成尝试赋值
            try {
                eval('target.' + key + ' = value')
                // 赋值失败则抛错
            } catch (e) {
                throw e
            }
        }
    
        return target
    }
}

module.exports = Config