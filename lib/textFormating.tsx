export function highlightText(text: string, query: string): string {
  const escapedQuery = escapeRegExp(query);
  const regex = new RegExp(escapedQuery, "gi");

  return text.replace(regex, (match) => `<mark>${match}</mark>`);
}

export function splitText(text: string, char: string): string {
  const parts = text.split(char);
  return parts.join(`;<br />`);
}

// The word after "jf." should be a link and color blue
export function linkifyJf(text: string): string {
  // Update the regex to match words with special characters like æ, ø, å
  const regex = /jf\.\s*([\wæøáŋåÆØÅÁŊ]+)/gi;

  return text.replace(regex, (_match, word) => {
    return `jf. <a href="?q=${word}" class="jf-link">${word}</a>`;
  });
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
