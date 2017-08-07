# wxml-transformer

将微信小程序的wxml代码转换成js object或html片段

> 注意：此工具单独使用无任何意义，因为默认配置中，wxml标签的相关属性名和值都会原封不动的传递给转换后的html标签，所以转换后的html不拥有功能，只拥有结构；不过此工具可以供其他解决方案使用，如：存在一种将小程序应用直接转换成vue/react/angular单页应用的解决方案。

[![Build Status](https://travis-ci.org/imingyu/wxml-transformer.svg?branch=master)](https://travis-ci.org/imingyu/wxml-transformer)
![image](https://img.shields.io/npm/l/wxml-transformer.svg)
[![image](https://img.shields.io/npm/v/wxml-transformer.svg)](https://www.npmjs.com/package/wxml-transformer)
[![image](https://img.shields.io/npm/dt/wxml-transformer.svg)](https://www.npmjs.com/package/wxml-transformer)

## 安装
```bash
npm i wxml-transformer --save-dev
```

## 使用
```javascript
var transformer = require('wxml-transformer');
transformer.toHtml('<view id="box">{{123}}</view>');
//<div id="box">{{123}}</div>


var options = {
    mapping: {
        view: 'section',
        text: (element, helper) => {
            return `<span data-wxa="text" ${helper.propsStringify(element.props)}>` +
                `${helper.childrenStringify(element.children, options)}</span>`;
        }
    }
};
transformer.toHtml('<view id="box">{{123}} <text id="t1">456</text></view>', options);
//<section id="box">{{123}} <span data-wxa="text" id="t1">456</span></section>

transformer.toObject('<view id="box">{{123}}</view>');
//{tag:'view', props:[{name:'id', value:'box'}], children:[ {'{{123}}'} ]}

transformer.toObject('<view id="box" hidden>{{123}}</view>');
//{tag:'view', props:[{name:'id', value:'box'}, {name:'hidden', onlyName:true}], children:[ {'{{123}}'} ]}
```


## 更新日志

## v0.1.2
- `toObject`方法转换后的结果中`props`不在是一个`object`，而是一个`Array`，结构为：`[{name:String, value:String, onlyName:Boolean}]`;
- `toObject`支持将无属性值的属性添加特殊标记，以供后续程序使用，特殊标记为`onlyName`，是个`Boolean`值;

### v0.1.0 ~ v0.1.1
初步功能，包括：
- 将`wxml`转换成`object`;
- 将`wxml`转换成`html`;
- 将`object`转换成`html`;