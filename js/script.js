const body = document.body;
const searchArea = body.querySelector(".main");


const search = document.getElementById("search");

search.addEventListener("input", () => {
    console.log(search.value);
})

const treeWalker = document.createTreeWalker(searchArea, NodeFilter.SHOW_TEXT);

const textObjects = [];
while (treeWalker.nextNode()) {
    const currNode = treeWalker.currentNode;
    if (currNode.data.trim()) textObjects.push(currNode);
}

console.log(textObjects)

textObjects.forEach(textNode => {
    textNode.data = textNode.data.replaceAll(search.value, search.value.toUpperCase());
})




