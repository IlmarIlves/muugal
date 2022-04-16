// import { extendType, idArg } from "@nexus/schema";
// import { JSONSchema4 } from "json-schema";
// import { validate } from "../../../../lib/validate/validate";
// import { UserEntity } from "../../../entities/UserEntity";

// const schema: JSONSchema4 = {
//   $async: true,
//   type: "object",
//   properties: {
//     userId: {
//       title: "User id",
//       description: "User id to get info about",
//       type: "string",
//       format: "existing-user",
//     },
//   },
//   required: ["userId"],
// };

// export default extendType({
//   type: "Admin",
//   definition(t) {
//     t.field("user", {
//       type: "AdminUser",
//       description: "Admin user by id",
//       args: {
//         userId: idArg({ description: "User identifier" }),
//       },
//       resolve: async (_parent, args, _context) => {
//         await validate(args, schema);

//         const { userId } = args;

//         const user = await UserEntity.findOne({ where: { id: userId } });

//         if (!user) {
//           throw new Error("Fetch user by id passed validation but could not be found, this should not happen");
//         }

//         return user;
//       },
//     });
//   },
// });
