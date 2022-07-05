import { enumType } from "@nexus/schema";
import { OrderProgressStatus } from "../../../entities/OrderEntity";

export default enumType({
  name: "OrderProgressStatusEnum",
  members: Object.keys(OrderProgressStatus),
});
