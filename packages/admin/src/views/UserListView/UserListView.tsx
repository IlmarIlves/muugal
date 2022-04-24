import { gql } from "@apollo/client";
import React, { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FilterBaseData } from "../../components/Filter/Filter";
import { ConditionModeEnum, MatchModeEnum, useUsersQuery } from "../../generated/graphql";
import { useUrlParams } from "../../hooks/useUrlParams";
import { AdminViewParams, ADMIN_VIEW_PATH } from "../../routes";
import { buildUrl } from "../../services/buildUrl";
import { getPageCount } from "../../services/getPageCount";
import { getSkipTake } from "../../services/getSkipTake";
import { AdminViewProps } from "../AdminView/AdminView";
import { ErrorView } from "../ErrorView/ErrorView";
import "./userListView.scss";

gql`
  query Orders {
    admin {
      orders {
          id
          email
          firstName
          lastName
        }
      }
    }
  }
`;

// fetch filtered and paginated list of admin users
gql`
  query Users($filter: AdminUsersFilterInput, $pagination: PaginationInput, $match: MatchInput) {
    admin {
      users(filter: $filter, pagination: $pagination, match: $match) {
        skip
        take
        total
        users {
          id
          email
          firstName
          lastName
        }
      }
    }
  }
`;

gql`
  query UserById($userId: ID!) {
    admin {
      user(userId: $userId) {
        id
        firstName
        lastName
      }
    }
  }
`;

interface UsersFilterData extends FilterBaseData {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  // status: UserStatusEnum[];
  // role: UserRoleEnum[];
}

// TODO: implement pagination "show all"
export const UserListView: React.FC<AdminViewProps> = ({ viewer }) => {
  const navigate = useNavigate();

  // parse filter url parameters
  const params = useUrlParams<UsersFilterData>((params) => ({
    userId: params.userId ?? "",
    email: params.email ?? "",
    firstName: params.firstName ?? "",
    lastName: params.lastName ?? "",
    // status: params.status ? (params.status.split(",") as UserStatusEnum[]) : [],
    // role: params.role ? (params.role.split(",") as UserRoleEnum[]) : [],
    matchMode: params.matchMode ? (params.matchMode as MatchModeEnum) : MatchModeEnum.StartsWith,
    conditionMode: params.conditionMode ? (params.conditionMode as ConditionModeEnum) : ConditionModeEnum.And,
    page: params.page ? parseInt(params.page, 10) : 1,
  }));

  // load list of filtered and paginated entries
  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useUsersQuery({
    variables: {
      filter: {
        userId: params.userId.length > 0 ? params.userId : undefined,
        email: params.email.length > 0 ? params.email : undefined,
        firstName: params.firstName.length > 0 ? params.firstName : undefined,
        lastName: params.lastName.length > 0 ? params.lastName : undefined,
        // status: params.status.length > 0 ? params.status : undefined,
        // role: params.role.length > 0 ? params.role : undefined,
      },
      pagination: {
        ...getSkipTake(params.page),
      },
      match: {
        matchMode: params.matchMode,
        conditionMode: params.conditionMode,
      },
    },
  });

  // pagination info
  const users = useMemo(() => usersData?.admin.users.users ?? [], [usersData?.admin.users.users]);
  const total = usersData?.admin.users.total ?? 0;
  const pageCount = getPageCount(total);

  // data table rows
  const rows = useMemo(
    () =>
      users.map((user) => {
        // TODO: this will be used when restoring "Login as" functionality
        // const isRegularUser = user.roles.length === 1 && user.roles[0] === UserRoleEnum.USER;

        return {
          id: user.id,
          cells: [
            {
              content: user.firstName,
            },
            {
              content: user.email,
            },
          ],
          actions: [
            // user.status !== UserStatusEnum.DISABLED
            //   ? {
            //       label: "Disable",
            //       authorizedScopes: [
            //         UserScopeEnum.SUPERADMIN,
            //         UserScopeEnum.ADMIN_USERS,
            //         UserScopeEnum.ADMIN_USERS_UPDATE_INFO,
            //         UserScopeEnum.ADMIN_USERS_UPDATE_STATUS,
            //       ],
            //       loading: adminUpdateUserDisableStatusResult.loading,
            //       onClick: () =>
            //         adminUpdateUserDisableStatus({
            //           variables: {
            //             userIds: [user.id],
            //             status: UserStatusEnum.DISABLED,
            //           },
            //         }),
            //     }
            //   : null,
            // user.status !== UserStatusEnum.ACTIVE
            //   ? {
            //       label: "Activate",
            //       authorizedScopes: [
            //         UserScopeEnum.SUPERADMIN,
            //         UserScopeEnum.ADMIN_USERS,
            //         UserScopeEnum.ADMIN_USERS_UPDATE_INFO,
            //         UserScopeEnum.ADMIN_USERS_UPDATE_STATUS,
            //       ],
            //       loading: adminUpdateUserActiveStatusResult.loading,
            //       onClick: () =>
            //         adminUpdateUserActiveStatus({
            //           variables: {
            //             userIds: [user.id],
            //             status: UserStatusEnum.ACTIVE,
            //           },
            //         }),
            //     }
            //   : null,
            // {
            //   label: "Reset password",
            //   onClick: () => setShowConfirmResetPasswordModal(user),
            // },
          ],
        };
      }),
    [],
  );

  // handle errors
  if (usersError) {
    return <ErrorView title="Fetching users failed" error={usersError} />;
  }

  // render view
  return (
    <>
      <div>Muugal users</div>
      <div className="users">
        {users.map((user) => {
          return (
            <div
              className={"user"}
              onClick={() =>
                navigate({
                  pathname: buildUrl<AdminViewParams>(ADMIN_VIEW_PATH, {
                    menu: "users",
                    page: "user",
                    modifier: user.id,
                  }),
                })
              }
            >
              <span>{user.id}</span>
              <span>{user.firstName}</span>
              <span>{user.lastName}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};
