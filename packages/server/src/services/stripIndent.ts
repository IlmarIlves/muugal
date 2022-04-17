import { getMinIndent } from "./getMinIndent";

export function stripIndent(string: string) {
  const indent = getMinIndent(string);

  if (indent === 0) {
    return string;
  }

  const regex = new RegExp(`^[ \\t]{${indent}}`, "gm");

  return string.replace(regex, "");
}
