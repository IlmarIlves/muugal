// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isFormatError(params: any) {
    return typeof params === "object" && params !== null && typeof params.format === "string";
  }
  