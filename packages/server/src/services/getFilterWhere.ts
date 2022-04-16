import { SelectQueryBuilder, BaseEntity } from "typeorm";
import { ConditionMode } from "../schema/public/filter/ConditionModeEnum";
import { MatchMode } from "../schema/public/filter/MatchModeEnum";
import { getMatchMode } from "./getMatchMode";
import { getQueryWhereByConditionMode } from "./getQueryWhereByConditionMode";
import { like } from "./like";


export type ComparisonOperator = "=" | ">" | "<" | ">=" | "<=" | "<>" | "LIKE" | "IN";

// it's important that the parameters used in the query are unique
let parameterCounter = 0;

export function getFilterWhere(
  query: SelectQueryBuilder<BaseEntity>,
  matchMode: MatchMode | string | null = MatchMode.STARTS_WITH,
  conditionMode: ConditionMode | string | null = ConditionMode.AND,
) {
  // get where that satisfies condition mode
  const where = getQueryWhereByConditionMode(query, conditionMode);

  return (
    field: string,
    comparison: ComparisonOperator = "=",
    value: string | string[] | boolean | null | undefined,
    matchModeOverride?: MatchMode | string,
  ) => {
    // ignore invalid and empty values
    if (value === null || value === undefined || (typeof value === "string" && value.length === 0)) {
      return;
    }

    // resolve match mode to use
    const useMatchMode = getMatchMode(matchModeOverride ?? matchMode);

    // apply match mode to value if using LIKE comparison
    const useValue = comparison === "LIKE" && typeof value === "string" ? like(value, useMatchMode) : value;

    // build unique parameter name, otherwise several conditions on single field get overwritten
    const parameterName = `value${parameterCounter++}`;

    // build parameter reference
    const parameterReference = comparison === "IN" ? `(:...${parameterName})` : `:${parameterName}`;

    where(`${field} ${comparison} ${parameterReference}`, { [parameterName]: useValue });
  };
}
