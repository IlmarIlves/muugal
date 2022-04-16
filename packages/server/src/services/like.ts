import { MatchMode } from "../schema/public/filter/MatchModeEnum";
import { getMatchMode } from "./getMatchMode";

export function like(value: string, matchMode?: MatchMode | string | null) {
  const useMatchMode = getMatchMode(matchMode);

  switch (useMatchMode) {
    case MatchMode.EXACT:
      return value;

    case MatchMode.STARTS_WITH:
      return `${value}%`;

    case MatchMode.CONTAINS:
      return `%${value}%`;
  }
}
