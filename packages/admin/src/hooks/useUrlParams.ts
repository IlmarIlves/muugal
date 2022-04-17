import { useLocation } from "react-router-dom";

export type UrlParams<TParams extends Record<string, unknown>> = { [key in keyof TParams]?: string };

export type ProcessUrlParams<TParams extends Record<string, unknown>> = (params: UrlParams<TParams>) => TParams;

export function useUrlParams<TParams extends Record<string, unknown>>(
  process: ProcessUrlParams<TParams>,
  defaults: Partial<Record<keyof TParams, string>> = {},
) {
  const search = useLocation().search;
  const urlSearchParams = Object.fromEntries(new URLSearchParams(search));

  for (const [key, value] of Object.entries(defaults)) {
    if (urlSearchParams[key] === undefined && value !== undefined) {
      urlSearchParams[key] = value;
    }
  }

  const keys = Object.keys(urlSearchParams);
  const result: UrlParams<TParams> = {};

  for (const key of keys) {
    const value = urlSearchParams[key];

    if (typeof value === "string" && value.length > 0) {
      result[key as keyof TParams] = value;
    }
  }

  return process(result);
}
