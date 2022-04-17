// https://github.com/jamiebuilds/min-indent/blob/master/index.js
export function getMinIndent(string: string) {
    const match = string.match(/^[ \t]*(?=\S)/gm);
  
    if (!match) {
      return 0;
    }
  
    return match.reduce((r, a) => Math.min(r, a.length), Infinity);
  }
  