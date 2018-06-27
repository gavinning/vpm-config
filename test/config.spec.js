const assert = require('assert')
const Config = require('../src/config')

describe('Class Config test', () => {

    it('Config.prototype.set', () => {
        let config = new Config({})
        config.set('dev.app.name', 'name')
        assert.equal('name', config.get('dev.app.name'))
    })

    it('Config.prototype.merge', () => {
        let config = new Config({})

        config.merge({
            dev: {
                db: 'localhost',
                username: 'username',
                password: 'password'
            },
            prod: {
                db: 'production',
                username: 'admin',
                password: 'admin'
            }
        })

        config.merge('preview.username', 'admin')
        config.merge('test.app.image.domain', 'image.com')

        assert.equal('username', config.get('dev.username'))
        assert.equal('admin', config.get('prod.username'))
        assert.equal('admin', config.get('preview.username'))
        assert.equal('image.com', config.get('test.app.image.domain'))
        assert.deepEqual({domain: 'image.com'}, config.get('test.app.image'))
    })
})