import { ConditionModeEnum, MatchModeEnum } from "../../generated/graphql";
import { UrlSearchParam } from "../../services/getUrlSearchParamStrings";

export interface FilterBaseData extends Record<string, UrlSearchParam> {
  matchMode: MatchModeEnum;
  conditionMode: ConditionModeEnum;
  page: number;
}
