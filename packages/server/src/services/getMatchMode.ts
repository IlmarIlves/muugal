import { MatchMode } from "../schema/public/filter/MatchModeEnum";

export function getMatchMode(matchMode?: MatchMode | string | null) {
  if (matchMode === null || matchMode === undefined) {
    return MatchMode.STARTS_WITH;
  }

  if (typeof matchMode === "string") {
    switch (matchMode.toUpperCase()) {
      case "EXACT":
        return MatchMode.EXACT;

      case "CONTAINS":
        return MatchMode.CONTAINS;

      default:
        return MatchMode.STARTS_WITH;
    }
  }

  return matchMode;
}
