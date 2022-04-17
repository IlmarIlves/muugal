import { extendType, inputObjectType } from "@nexus/schema";
import { JSONSchema4 } from "json-schema";
import { validate } from "../../../../lib/validate/validate";
import { UserEntity, UserRole } from "../../../entities/UserEntity";
import { getFilterWhere } from "../../../services/getFilterWhere";
import { getPaginationOptions } from "../../../services/getPaginationOptions";
import { MatchInput, matchSchema } from "../../public/filter/match-input";
import { PaginationInput, paginationSchema } from "../../public/pagination/pagination-input";

const schema: JSONSchema4 = {
  $async: true,
  type: "object",
  properties: {
    pagination: paginationSchema,
    match: matchSchema,
    filter: {
      type: "object",
      properties: {
        userId: {
          title: "User id",
          type: "string",
        },
        email: {
          title: "Email",
          type: "string",
        },
        firstName: {
          title: "Name",
          type: "string",
        },
        lastName: {
          title: "Name",
          type: "string",
        },
        role: {
          title: "Role",
          type: "array",
          items: {
            title: "Role",
            type: "string",
            enum: Object.keys(UserRole),
          },
        },
      },
    },
  },
};

export const AdminUsersFilterInput = inputObjectType({
  name: "AdminUsersFilterInput",
  definition(t) {
    t.string("userId", { description: "Filter users by id", });
    t.string("email", { description: "Filter users by email" });
    t.string("firstName", { description: "Filter users by first name" });
    t.string("lastName", { description: "Filter users by last name" });
  },
});


export default extendType({
  type: "Admin",
  definition(t) {
    t.field("users", {
      type: "AdminUsers",
      description: "List of users",
      args: {
        pagination: PaginationInput.asArg(),
        match: MatchInput.asArg(),
        filter: AdminUsersFilterInput.asArg(),
      },
      resolve: async (_parent, args, _context) => {
        await validate(args, schema);

        // get pagination options
        const { skip, take } = getPaginationOptions(args.pagination);

        // build query
        const query = UserEntity.getRepository().createQueryBuilder("user").skip(skip).take(take);

        // get arguments
        const { filter } = args;

        // apply filtering if requested
        if (filter) {
          // get filter method using chosen match and condition modes
          const filterWhere = getFilterWhere(query, args.match?.matchMode, args.match?.conditionMode);

          // apply field filters
          filterWhere("user.id", "LIKE", filter.userId);
          filterWhere("user.email", "LIKE", filter.email);
          filterWhere("user.firstName", "LIKE", filter.name);
          filterWhere("user.lastName", "LIKE", filter.name);
        }

        // fetch results with count
        const [users, total] = await query.getManyAndCount();

        // return matches and pagination metadata
        return {
          skip,
          take,
          total,
          users,
        };
      },
    });
  },
});
