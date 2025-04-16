function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.toLowerCase().slice(1);
}

function clearElement(element) {
    element.replaceChildren();
}


export { capitalize, clearElement };