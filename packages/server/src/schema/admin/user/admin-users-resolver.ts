import { extendType, inputObjectType, nullable } from "@nexus/schema";
import { JSONSchema4 } from "json-schema";
import { Brackets } from "typeorm";
import { validate } from "../../../../lib/validate/validate";
import { UserEntity, UserRole, UserStatus } from "../../../entities/UserEntity";
import { formatDate } from "../../../services/formatDate";
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
        name: {
          title: "Name",
          type: "string",
        },
        registeredAfter: {
          title: "Registered after",
          type: "string",
          format: "date-time",
        },
        registeredBefore: {
          title: "Registered before",
          type: "string",
          format: "date-time",
        },
        status: {
          title: "Status",
          type: "array",
          items: {
            title: "Status",
            type: "string",
            enum: Object.keys(UserStatus),
          },
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
        hasSubscription: {
          title: "Has subscription",
          type: "boolean",
        },
      },
    },
  },
};

export const AdminUsersFilterInput = inputObjectType({
  name: "AdminUsersFilterInput",
  definition(t) {
    t.nullable.string("userId", { description: "Filter users by id" });
    t.nullable.string("email", { description: "Filter users by email" });
    t.nullable.string("name", { description: "Filter users by name" });
    t.nullable.list.field("status", { type: "UserStatusEnum", description: "Filter users by status" });
    t.nullable.list.field("role", { type: "UserRoleEnum", description: "Filter users by role" });
    t.nullable.boolean("hasSubscription", { description: "Filter by whether the user has a subscription" });
  },
});


export default extendType({
  type: "Admin",
  definition(t) {
    t.field("users", {
      type: "AdminUsers",
      description: "List of users",
      args: {
        pagination: nullable(PaginationInput.asArg()),
        match: nullable(MatchInput.asArg()),
        filter: nullable(AdminUsersFilterInput.asArg()),
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
          filterWhere("user.name", "LIKE", filter.name);
          filterWhere(
            "user.createdDate",
            ">=",
            filter.registeredAfter ? formatDate(filter.registeredAfter) : undefined,
          );
          filterWhere(
            "user.createdDate",
            "<=",
            filter.registeredBefore ? formatDate(filter.registeredBefore) : undefined,
          );
          filterWhere("user.status", "IN", filter.status);

          const { role } = filter;

          // filter by roles set
          if (role) {
            query.andWhere(
              new Brackets((qb) => {
                role.forEach((roleItem, roleIndex) =>
                  qb.orWhere(`user.roles LIKE :role${roleIndex}`, { [`role${roleIndex}`]: `%${roleItem}%` }),
                );
              }),
            );
          }

          // apply having active subscription filter
          const hasSubscription = filter.hasSubscription ?? null;

          // TODO: cancelled date can be null but trial ending may be in future, so it is valid subscription then
          if (hasSubscription !== null) {
            query.andWhere((qb) => {
              const subQuery = qb
                .subQuery()
                .select("1")
                .where("user_subscriptions.userId = user.id")
                .andWhere("user_subscriptions.startDate <= NOW()")
                .andWhere("user_subscriptions.endDate > NOW()")
                .andWhere("user_subscriptions.cancelledDate IS NULL")
                .andWhere("user_subscriptions.disabledDate IS NULL")
                .getQuery();

              return `${hasSubscription ? "EXISTS" : "NOT EXISTS"} ${subQuery}`;
            });
          }
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
