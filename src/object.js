/**
 * wxml转object
 * @author imingyu<mingyuhisoft@163.com>
 * @date 2017-6-27
 */
import { each } from './util.js';
var JSDOM = require('jsdom').JSDOM;

var elementToObject = (element) => {
    var result;
    if (element.nodeType != 1) {
        result = element.nodeValue;
    } else {
        result = {
            props: {},
            children: []
        };
        result.tag = (element.nodeName || element.tagName).toLowerCase();
        if (element.attributes && element.attributes.length > 0) {
            each(element.attributes, item => {
                result.props[item.name] = item.value;
            });
        }
        if (element.childNodes && element.childNodes.length > 0) {
            each(element.childNodes, item => {
                result.children.push(elementToObject(item));
            });
        }
    }
    return result;
}

var toObject = (wxmlContent) => {
    var result = [];
    var dom = new JSDOM(wxmlContent);
    each(dom.window.document.body.children, item => {
        result.push(elementToObject(item));
    });
    return result;
}

export default toObject;