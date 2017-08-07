export var defaultTransformOptions = {
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
        checkbox: (element, helper) => {
            return `<input type="checkbox"${helper.propsStringify(element.props)} />` + (element.children && element.children.length > 0 ? `${helper.childrenStringify(element.children)}` : '');
        },
        form: 'form',
        input: 'input',
        label: 'label',
        picker: 'div',
        'picker-view': 'div',
        radio: (element, helper) => {
            return `<input type="radio"${helper.propsStringify(element.props)} />` + (element.children && element.children.length > 0 ? `${helper.childrenStringify(element.children)}` : '');
        },
        slider: 'div',
        switch: (element, helper) => {
            return `<input type="checkbox"${helper.propsStringify(element.props)} />` + (element.children && element.children.length > 0 ? `${helper.childrenStringify(element.children)}` : '');
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