import { enumType } from "@nexus/schema";
import { OrderColors } from "../../../entities/OrderEntity";

export default enumType({
  name: "OrderColorsEnum",
  members: Object.keys(OrderColors),
});
