import { enumType } from "@nexus/schema";

export enum ConditionMode {
  AND = "AND",
  OR = "OR",
}

export default enumType({
  name: "ConditionModeEnum",
  members: Object.keys(ConditionMode),
});
