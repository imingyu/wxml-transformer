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
//{tag:'view', props:{id:'box'}, children:[ {'{{123}}'} ]}
```