const body = document.body;
const searchArea = body.querySelector(".main");
const search = document.getElementById("search");
const searchMatches = document.getElementById("results-count");

const treeWalker = document.createTreeWalker(searchArea, NodeFilter.SHOW_TEXT);

const textObjects = [];
while (treeWalker.nextNode()) {
    const currNode = treeWalker.currentNode;
    if (currNode.textContent.trim()) textObjects.push(currNode);
}


search.addEventListener("input", function() {

    CSS.highlights.clear();

    const searchInput = search.value.trim();
    if ( !searchInput ) {
        searchMatches.parentElement.classList.remove("display");
        return;
    }

    const ranges = textObjects.map(el => {

        const indices = [];
        const elTextContent = el.textContent.trim();
        let i = 0;
        let index = elTextContent.indexOf(searchInput, i);

        while (index !== -1) {
            indices.push(index);
            i = index + searchInput.length;
            index = elTextContent.indexOf(searchInput, i);
        }

        return indices.map(index => {
            const range = new Range();
            range.setStart(el, index);
            range.setEnd(el, index + searchInput.length);
            return range;
        });

    })
    
    if (ranges.flat().length !== 0) {
        const searchResultsHighlight = new Highlight(...ranges.flat());
        CSS.highlights.set("search-results", searchResultsHighlight);
    }

    searchMatches.parentElement.classList.add("display");
    searchMatches.textContent = ranges.flat().length;

})


