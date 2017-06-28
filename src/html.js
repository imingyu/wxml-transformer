/**
 * wxml转html
 * @author imingyu<mingyuhisoft@163.com>
 * @date 2017-6-27
 */
import { each, extend } from './util.js';
import toObject from './object.js';
import { defaultTransformOptions } from './options.js';

var propsStringify = (props) => {
    var html = "";
    each(props, (value, prop) => {
        html += ` ${prop}="${value}"`;
    });
    return html;
}

var childrenStringify = (children, options) => {
    return (children || []).map(item => {
        return elementStringify(item, options);
    }).join('');
}

var createElement = (tagName, propsStr, innerHtml) => {
    return `<${tagName}${propsStr}>${innerHtml}</${tagName}>`;
}

var defaultHelper = {
    propsStringify: propsStringify,
    childrenStringify: childrenStringify,
    elementStringify: elementStringify
};

var elementStringify = (elementSpec, options) => {
    if (typeof elementSpec === 'string') return elementSpec;
    var elementHtml = "",
        wxmlTagName = elementSpec.tag;
    if (options.mapping && options.mapping[wxmlTagName]) {
        var transform = options.mapping[wxmlTagName];
        if (typeof transform === 'string') {
            elementHtml += createElement(transform, propsStringify(elementSpec.props), childrenStringify(elementSpec.children, options));
        } else if (typeof transform === 'function') {
            elementHtml += transform(elementSpec, defaultHelper);
        } else {
            elementHtml += createElement(wxmlTagName, propsStringify(elementSpec.props), childrenStringify(elementSpec.children, options));
        }
    } else {
        elementHtml += createElement(wxmlTagName, propsStringify(elementSpec.props), childrenStringify(elementSpec.children, options));
    }
    return elementHtml;
}

export default (wxmlContent, options) => {
    options = options || {};
    options = extend(true, {}, defaultTransformOptions, options);
    var html = "",
        wxmlObject = toObject(wxmlContent);
    each(wxmlObject, item => {
        html += elementStringify(item, options);
    });
    return html;
};