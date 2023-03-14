const querySelectorAll = (node, selector) => {
    // https://stackoverflow.com/questions/57813144/how-to-select-element-inside-open-shadow-dom-from-document
    const nodes = [...node.querySelectorAll(selector)];
    const nodeIterator = document.createNodeIterator(node, Node.ELEMENT_NODE);
    let currentNode;
    while (currentNode = nodeIterator.nextNode()) {
        if (currentNode.shadowRoot) {
            nodes.push(...querySelectorAll(currentNode.shadowRoot, selector));
        }
    }
    return nodes;
}

const res = []

const pushLatest = () => {
    let cards = querySelectorAll(document, ".ac-adaptiveCard")
    if (cards && cards[cards.length - 1]) {
        let latest = cards[cards.length - 1].innerText
        if (res[res.length - 1] !== latest) {
            res.push(latest)
            console.log(res[res.length - 1])
        }
    }
}

setInterval(pushLatest, 50)

console.clear()
