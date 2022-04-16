import { ConditionMode } from "../schema/public/filter/ConditionModeEnum";

export function getConditionMode(conditionMode?: ConditionMode | string | null) {
  if (conditionMode === null || conditionMode === undefined) {
    return ConditionMode.AND;
  }

  if (typeof conditionMode === "string") {
    switch (conditionMode.toUpperCase()) {
      case "OR":
        return ConditionMode.OR;

      default:
        return ConditionMode.AND;
    }
  }

  return conditionMode;
}
