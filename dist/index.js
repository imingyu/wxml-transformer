'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var each = function each(arr, cb) {
    if (arr && arr.length && arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            cb(arr[i], i);
        }
    } else if (arr) {
        for (var _i in arr) {
            if (_i != 'length') cb(arr[_i], _i);
        }
    }
};

//jQuery版extend函数
var extend = function extend() {
    var options,
        name,
        src,
        copy,
        copyIsArray,
        clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false,
        toString = Object.prototype.toString,
        hasOwn = Object.prototype.hasOwnProperty,
        push = Array.prototype.push,
        slice = Array.prototype.slice,
        trim = String.prototype.trim,
        indexOf = Array.prototype.indexOf,
        class2type = {
        "[object Boolean]": "boolean",
        "[object Number]": "number",
        "[object String]": "string",
        "[object Function]": "function",
        "[object Array]": "array",
        "[object Date]": "date",
        "[object RegExp]": "regexp",
        "[object Object]": "object"
    },
        jQuery = {
        isFunction: function isFunction(obj) {
            return jQuery.type(obj) === "function";
        },
        isArray: Array.isArray || function (obj) {
            return jQuery.type(obj) === "array";
        },
        isWindow: function isWindow(obj) {
            return obj != null && obj == obj.window;
        },
        isNumeric: function isNumeric(obj) {
            return !isNaN(parseFloat(obj)) && isFinite(obj);
        },
        type: function type(obj) {
            return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
        },
        isPlainObject: function isPlainObject(obj) {
            if (!obj || jQuery.type(obj) !== "object" || obj.nodeType) {
                return false;
            }
            try {
                if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                    return false;
                }
            } catch (e) {
                return false;
            }
            var key;
            for (key in obj) {}
            return key === undefined || hasOwn.call(obj, key);
        }
    };
    if (typeof target === "boolean") {
        deep = target;
        target = arguments[1] || {};
        i = 2;
    }
    if ((typeof target === "undefined" ? "undefined" : _typeof(target)) !== "object" && !jQuery.isFunction(target)) {
        target = {};
    }
    if (length === i) {
        target = this;
        --i;
    }
    for (i; i < length; i++) {
        if ((options = arguments[i]) != null) {
            for (name in options) {
                src = target[name];
                copy = options[name];
                if (target === copy) {
                    continue;
                }
                if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && jQuery.isArray(src) ? src : [];
                    } else {
                        clone = src && jQuery.isPlainObject(src) ? src : {};
                    }
                    // WARNING: RECURSION
                    target[name] = extend(deep, clone, copy);
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }
    return target;
};

/**
 * wxml转object
 * @author imingyu<mingyuhisoft@163.com>
 * @date 2017-6-27
 */
var p5 = require('parse5');

var elementToObject = function elementToObject(element) {
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
        Object.keys(element.__location.attrs).forEach(function (name) {
            var attr = element.__location.attrs[name];
            if (name.length === attr.endOffset - attr.startOffset) {
                onlyNameAttrs.push(name);
            }
        });
        if (element.attrs && element.attrs.length > 0) {
            each(element.attrs, function (attr) {
                if (onlyNameAttrs.indexOf(attr.name) === -1) {
                    result.props.push({
                        name: attr.name,
                        value: attr.value
                    });
                } else {
                    result.props.push({
                        name: attr.name,
                        onlyName: true
                    });
                }
            });
        }
        if (element.childNodes && element.childNodes.length > 0) {
            each(element.childNodes, function (item) {
                result.children.push(elementToObject(item));
            });
        }
    }
    return result;
};

var toObject = function toObject(wxmlContent) {
    var result = [],
        dom = p5.parse(wxmlContent, {
        locationInfo: true
    }),
        body = dom.childNodes[0].childNodes[1];
    each(body.childNodes, function (item) {
        result.push(elementToObject(item));
    });
    return result;
};

var defaultTransformOptions = {
    mapping: {
        block: 'div',
        page: 'div',
        view: 'div',
        'scroll-view': 'div',
        swiper: 'div',
        'swiper-item': 'div',
        'movable-view': 'div',
        icon: 'i',
        text: 'span',
        progress: 'div',
        button: 'button',
        'checkbox-group': 'div',
        checkbox: function checkbox(element, helper) {
            return '<input type="checkbox"' + helper.propsStringify(element.props) + ' />' + (element.children && element.children.length > 0 ? '' + helper.childrenStringify(element.children) : '');
        },
        form: 'form',
        input: 'input',
        label: 'label',
        picker: 'div',
        'picker-view': 'div',
        radio: function radio(element, helper) {
            return '<input type="radio"' + helper.propsStringify(element.props) + ' />' + (element.children && element.children.length > 0 ? '' + helper.childrenStringify(element.children) : '');
        },
        slider: 'div',
        switch: function _switch(element, helper) {
            return '<input type="checkbox"' + helper.propsStringify(element.props) + ' />' + (element.children && element.children.length > 0 ? '' + helper.childrenStringify(element.children) : '');
        },
        textarea: 'textarea',
        audio: 'object',
        image: 'img',
        video: 'object',
        map: 'div',
        canvas: 'canvas',
        'contact-button': 'button'
    }
};

/**
 * wxml转html
 * @author imingyu<mingyuhisoft@163.com>
 * @date 2017-6-27
 */
var propsStringify = function propsStringify(props) {
    var html = "";
    each(props, function (prop) {
        if (prop.onlyName) {
            html += ' ' + prop.name;
        } else {
            html += ' ' + prop.name + '="' + prop.value + '"';
        }
    });
    return html;
};

var childrenStringify = function childrenStringify(children, options) {
    return (children || []).map(function (item) {
        return elementStringify(item, options);
    }).join('');
};

var createElement = function createElement(tagName, propsStr, innerHtml) {
    return '<' + tagName + propsStr + '>' + innerHtml + '</' + tagName + '>';
};

var defaultHelper = {
    propsStringify: propsStringify,
    childrenStringify: childrenStringify,
    elementStringify: elementStringify
};

var elementStringify = function elementStringify(elementSpec, options) {
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
};

var toHtml = (function (wxmlContent, options) {
    options = options || {};
    options = extend(true, {}, defaultTransformOptions, options);
    var html = "",
        wxmlObject = toObject(wxmlContent);
    console.log(JSON.stringify(wxmlObject));
    each(wxmlObject, function (item) {
        html += elementStringify(item, options);
    });
    return html;
});

var index = {
    toObject: toObject,
    toHtml: toHtml
};

module.exports = index;
