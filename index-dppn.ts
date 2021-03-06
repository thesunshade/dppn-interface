import { dppnDpr } from "./dppnDpr.js";
const dictionaryArea: any = document.getElementById("dictionary-area");
const definitionArea: any = document.getElementById("definition");
import fuzzy from "./fuzzy.js";

function buildDictionaryHtmlInDivs(dppnDpr:any) {
  let html: string = "";
  dppnDpr.forEach((entry:any) => {
    html += `<div class="entry"><div class="head-word">${entry[0]}</div>  ${entry[1]}</div>`;
  });
  dictionaryArea.innerHTML = html;
}

function buildDictionaryHtml(dppnDpr:any) {
  let html: string = "<ul>";
  dppnDpr.forEach((entry:any) => {
    html += `<li>${entry[0].toLowerCase()}</li>`;
  });
  dictionaryArea.innerHTML = html + "</ul>";
}

// function buildDic(dppnDpr) {
//   let html: string = "";
//   dppnDpr.forEach(entry => {
//     html += `[\`${entry[0]}\`,\`${entry[1]}\`],\n`;
//   });
//   console.log(html);
// }
// buildDic(dppnDpr);

const inputWord = document.getElementById("word-input")!;
inputWord.focus()


inputWord.addEventListener("input", e => {
  if (!e.currentTarget.value || e.currentTarget.value.length <=2){dictionaryArea.innerHTML=""} else
  if (e.currentTarget.value && e.currentTarget.value.length > 2) {
  {
  let html: string = `<ul class="results">`;
  dppnDpr.forEach((item:any, index:number) => {
    if (new RegExp(fuzzy(e.currentTarget.value), "i").test(fuzzy(item[0]))) {
      html += `<li class="item" id="${index}">${item[0]}</li>`;
    }
  });
  dictionaryArea.innerHTML = html + "</ul>";
  const resultList = document.querySelectorAll(".item");
  resultList.forEach(listItem => {
    listItem.addEventListener("click", e => {
      definitionArea.innerHTML = `<h1>${dppnDpr[e.currentTarget.id][0]}</h1>${dppnDpr[e.currentTarget.id][1]}`;
      window.scrollTo(0, 0);
    });
  });}
});
