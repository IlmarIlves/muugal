// import { inputObjectType } from "@nexus/schema";
// import { JSONSchema4 } from "json-schema";

// export const PaginationInput = inputObjectType({
//   name: "PaginationInput",
//   definition(t) {
//     t.int("skip", { description: "Number of items to skip" });
//     t.int("take", { description: "Number of items to take" });
//   },
// });

// export const paginationSchema: JSONSchema4 = {
//   type: "object",
//   properties: {
//     skip: {
//       title: "Skip number of rows",
//       type: "number",
//       minimum: 0,
//     },
//     take: {
//       title: "Take number of rows",
//       type: "number",
//       minimum: 0,
//       maximum: 100,
//     },
//   },
// };
