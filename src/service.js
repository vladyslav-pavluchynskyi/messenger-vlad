export function removeClick(className) {
    const personals = document.getElementsByClassName(className);
    [].slice.call(personals).forEach(function (element) {
        element.classList = '';
    })
}

export function setPhoto(el, url) {
    el.setAttribute('style', `background-image: url(${url})`);
}

export function renderElement(block, className) {
    const blockElement = document.createElement(block);
    if (className) {
        blockElement.setAttribute('class', className);
    }
    return blockElement;
}

export function renderUl(className) {
    return renderElement('ul', className);
}

export function createLi(className) {
    return renderElement('li', className);
}

export function createSpan(className) {
    return renderElement('span', className);
}

export function createDiv(className) {
    return renderElement('div', className);
}
