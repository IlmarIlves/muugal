import { inputObjectType } from "@nexus/schema";
import { JSONSchema4 } from "json-schema";
import { ConditionMode } from "./ConditionModeEnum";
import { MatchMode } from "./MatchModeEnum";

export const MatchInput = inputObjectType({
  name: "MatchInput",
  definition(t) {
    t.field("matchMode", {
      type: "MatchModeEnum",
      default: MatchMode.STARTS_WITH,
    });
    t.field("conditionMode", {
      type: "ConditionModeEnum",
      default: ConditionMode.AND,
    });
  },
});

export const matchSchema: JSONSchema4 = {
  type: "object",
  properties: {
    matchMode: {
      title: "How to match text fields",
      type: "string",
      enum: Object.keys(MatchMode),
    },
    conditionMode: {
      title: "Should any or all conditions match",
      type: "string",
      enum: Object.keys(ConditionMode),
    },
  },
};
