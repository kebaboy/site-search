const sectionText = document.querySelector(".section__text");

const range = new Range();

const startOffset = 0; // начало выделения
const endOffset = Math.round(sectionText.textContent.length / 2); // конец выделения (половина текста)
range.setStart(sectionText, startOffset);
range.setEnd(sectionText, endOffset);

// Выводим выделенный текст в консоль (для демонстрации)
console.log(range.toString());


// const highlight = new Highlight(range1);
 
// CSS.highlights.set("first-highlight", highlight);
