import { SelectQueryBuilder, BaseEntity } from "typeorm";
import { ConditionMode } from "../schema/public/filter/ConditionModeEnum";
import { getConditionMode } from "./getConditionMode";


export function getQueryWhereByConditionMode(
  query: SelectQueryBuilder<BaseEntity>,
  conditionMode: ConditionMode | string | null = ConditionMode.AND,
) {
  // resolve match and condition mode to use
  const useConditionMode = getConditionMode(conditionMode);

  // choose whether to use andWhere or orWhere conditions
  return useConditionMode === ConditionMode.OR ? query.orWhere.bind(query) : query.andWhere.bind(query);
}
