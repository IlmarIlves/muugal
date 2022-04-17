import { DateRange } from "./parseDateRange";

export type UrlSearchParam = string | number | string[] | Date | DateRange | null | boolean | undefined;

export function getUrlSearchParamsString(urlSearchParams: Record<string, UrlSearchParam>) {
  const stringParams = stringifyUrlSearchParams(urlSearchParams);
  const queryString = new URLSearchParams(stringParams);

  return queryString.toString();
}

function stringifyUrlSearchParams(urlSearchParams: Record<string, UrlSearchParam>) {
  const result: Record<string, string> = {};

  for (const [key, param] of Object.entries(urlSearchParams)) {
    result[key] = stringifyUrlSearchParam(param);
  }

  return result;
}

function stringifyUrlSearchParam(param: UrlSearchParam) {
  if (typeof param === "string") {
    return param;
  }

  if (param instanceof Date) {
    return param.toISOString();
  }

  if (param === undefined || param === null) {
    return "";
  }

  if (Array.isArray(param)) {
    // handle date tuple [Date, Date | null]
    if (param.length === 2 && param[0] instanceof Date) {
      return `${param[0].toISOString()},${param[1] instanceof Date ? param[1].toISOString() : ""}`;
    }

    return param.join(",");
  }

  if (typeof param === "number") {
    return param.toString();
  }

  if (typeof param === "boolean") {
    return param ? "true" : "false";
  }

  return param;
}
