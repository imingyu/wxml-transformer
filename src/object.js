/**
 * wxml转object
 * @author imingyu<mingyuhisoft@163.com>
 * @date 2017-6-27
 */
import { each } from './util.js';
var p5 = require('parse5');

var elementToObject = (element) => {
    var result;
    if (element.nodeName === '#text') {
        result = element.value;
    } else {
        result = {
            props: [],
            children: []
        };
        result.tag = (element.nodeName || element.tagName).toLowerCase();
        var onlyNameAttrs = [];
        Object.keys(element.__location.attrs).forEach(name => {
            var attr = element.__location.attrs[name];
            if (name.length === attr.endOffset - attr.startOffset) {
                onlyNameAttrs.push(name);
            }
        });
        if (element.attrs && element.attrs.length > 0) {
            each(element.attrs, attr => {
                if (onlyNameAttrs.indexOf(attr.name) === -1) {
                    result.props.push({
                        name: attr.name,
                        value: attr.value
                    })
                } else {
                    result.props.push({
                        name: attr.name,
                        onlyName: true
                    })
                }
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
    var result = [],
        dom = p5.parse(wxmlContent, {
            locationInfo: true
        }),
        body = dom.childNodes[0].childNodes[1];
    each(body.childNodes, item => {
        result.push(elementToObject(item));
    });
    return result;
}

export default toObject;