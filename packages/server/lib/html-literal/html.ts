import { stripIndent } from "../../src/services/stripIndent";

type ConcatenatableItem = Record<string, unknown> | string | number | undefined;

type Concatenatable = ConcatenatableItem | ConcatenatableItem[];

export default function html(template: TemplateStringsArray, ...expressions: Concatenatable[]): string {
  const result = template.reduce((accumulator, part, i) => {
    const rawValue = expressions[i - 1]; // this might be an array
    const stringValue = Array.isArray(rawValue)
      ? rawValue.join("\n")
      : typeof rawValue === "string"
      ? rawValue
      : typeof rawValue === "number"
      ? rawValue.toString()
      : JSON.stringify(rawValue, undefined, 2);

    return `${accumulator}${stringValue}${part}`;
  });

  return stripIndent(result).trim();
}

export function emailHtml(template: TemplateStringsArray, ...expressions: Concatenatable[]): string {
  const result = template.reduce((accumulator, part, i) => {
    const rawValue = expressions[i - 1]; // this might be an array
    const stringValue = Array.isArray(rawValue)
      ? rawValue.join("\n")
      : typeof rawValue === "string"
      ? rawValue.replace(/\n\r?/g, "<br/>")
      : typeof rawValue === "number"
      ? rawValue.toString()
      : JSON.stringify(rawValue, undefined, 2);

    return `${accumulator}${stringValue}${part}`;
  });

  return stripIndent(result).trim();
}
