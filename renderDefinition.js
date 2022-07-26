import { dppnDpr as dictionary } from "./dppnDpr.js";
import addListenerToCrossRefs from "./addListenerToCrossRefs.js";
import { definitionArea } from "./index.js";

export default function renderDefinition(wordIndex) {
  const word = dictionary[wordIndex][0];
  let definition = dictionary[wordIndex][1];

  // in definition remove href from links and replace with a class and id
  definition = definition.replace(
    /href="javascript:void\(0\)" onclick="DPPNXML\('dppn.*?,(.+?)'\)"/gi,
    `id="$1" class="cross-ref"`
  );

  definitionArea.innerHTML = `<h1>${word} <a href="https://suttacentral.net/define/${word}" title="Go to the entry on SuttaCentral.net" target="_blank">🔗</a></h1>
${definition}`;

  window.scrollTo(0, 0);

  addListenerToCrossRefs();

  history.pushState({ page: word }, "", `?q=${word}`);

  document.title = word;
}
