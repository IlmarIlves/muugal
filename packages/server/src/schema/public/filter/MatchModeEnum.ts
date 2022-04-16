import { enumType } from "@nexus/schema";

export enum MatchMode {
  EXACT = "EXACT",
  STARTS_WITH = "STARTS_WITH",
  CONTAINS = "CONTAINS",
}

export default enumType({
  name: "MatchModeEnum",
  members: Object.keys(MatchMode),
});
