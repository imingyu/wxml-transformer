var fs = require('fs');
var assert = require('chai').assert;
var transformer = require('../dist/index.js');
describe('test wxml-transformer', function () {
    it('export', function () {
        assert.isTrue(typeof transformer === 'object');
        assert.isTrue(typeof transformer.toHtml === 'function');
        assert.isTrue(typeof transformer.toObject === 'function');
    });
    describe('toHtml', function () {
        it('view => div', function () {
            var html = transformer.toHtml('<view id="box">{{123}}</view>');
            assert.isTrue(html == '<div id="box">{{123}}</div>', `toHtml转换有问题，转换结果=${html}`);
        });

        /*var content = fs.readFileSync(__dirname+'/1.wxml', 'utf8');
        var html = transformer.toHtml(content);
        fs.writeFile(__dirname + '/1.result.html', html);*/
    });
});