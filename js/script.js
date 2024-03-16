const body = document.body;
const searchArea = body.querySelector(".main");


const treeWalker = document.createTreeWalker(searchArea, NodeFilter.SHOW_TEXT);

const textObjects = [];
while (treeWalker.nextNode()) {
    const currNode = treeWalker.currentNode;
    if (currNode.textContent.trim()) textObjects.push(currNode);
}

const search = document.getElementById("search");

search.addEventListener("input", () => {
    CSS.highlights.clear();
    if ( !search.value.trim() ) return;

    const ranges = textObjects.map(el => {
        let indices = [];
        let i = 0;
        while (el.textContent.indexOf(search.value, i) !== -1) {
            indices.push(el.textContent.indexOf(search.value, i));
            i = el.textContent.indexOf(search.value, i) + search.value.length;
        }
        return indices.map(index => {
            const range = new Range();
            range.setStart(el, index);
            range.setEnd(el, index + search.value.length);
            return range;
        });
    })
    
    const searchResultsHighlight = new Highlight(...ranges.flat());
    
    CSS.highlights.set("search-results", searchResultsHighlight);
})


