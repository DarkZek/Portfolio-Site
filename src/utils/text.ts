export function splitText(text: string, attr?: (i: number) => string): string {
  let out = "";

  let i = 0;
  for (const char of text) {
    if (char === "\n") {
      out += `<br />`;
    } else {
      const attributes = attr ? attr(i) : "";
      out += `<span ${attributes}>${char}</span>`;
      i++;
    }
  }

  return out;
}
