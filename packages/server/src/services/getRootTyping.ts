// returns the import declaration that will be used in generated typings.ts file to resolve given object root typing
export function getRootTypingImport(name: string) {
    return `import("./entities/${name}").${name}`;
  }
  