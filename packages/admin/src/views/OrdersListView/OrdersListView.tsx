import { gql } from "@apollo/client";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FilterBaseData } from "../../components/Filter/Filter";
import { useUrlParams } from "../../hooks/useUrlParams";
import { getSkipTake } from "../../services/getSkipTake";
import { ConditionModeEnum, MatchModeEnum, useOrdersQuery } from "../../generated/graphql";
import { AdminViewProps } from "../AdminView/AdminView";
import { ErrorView } from "../ErrorView/ErrorView";
import { getPageCount } from "../../services/getPageCount";
import { AdminViewParams, ADMIN_VIEW_PATH } from "../../routes";
import { buildUrl } from "../../services/buildUrl";

// fetch filtered and paginated list of admin users
gql`
  query Orders {
    admin {
      orders {
        orders {
          id
          email
          telephone
          colors
          amount
        }
      }
    }
  }
`;

// TODO: implement pagination "show all"
export const OrdersListView: React.FC<AdminViewProps> = ({ viewer }) => {
  const navigate = useNavigate();

  // parse filter url parameters
  // const params = useUrlParams<UsersFilterData>((params) => ({
  //   userId: params.userId ?? "",
  //   email: params.email ?? "",
  //   firstName: params.firstName ?? "",
  //   lastName: params.lastName ?? "",
  //   // status: params.status ? (params.status.split(",") as UserStatusEnum[]) : [],
  //   // role: params.role ? (params.role.split(",") as UserRoleEnum[]) : [],
  //   matchMode: params.matchMode ? (params.matchMode as MatchModeEnum) : MatchModeEnum.StartsWith,
  //   conditionMode: params.conditionMode ? (params.conditionMode as ConditionModeEnum) : ConditionModeEnum.And,
  //   page: params.page ? parseInt(params.page, 10) : 1,
  // }));

  // load list of filtered and paginated entries
  const { data: ordersData, loading: ordersLoading, error: ordersError } = useOrdersQuery();

  const orders = useMemo(() => ordersData?.admin.orders.orders ?? [], [ordersData?.admin.orders.orders]);
  // const total = ordersData?.admin.orders.total ?? 0;
  // const pageCount = getPageCount(total);

  // data table rows
  const rows = useMemo(
    () =>
      orders.map((order) => {
        // TODO: this will be used when restoring "Login as" functionality
        // const isRegularUser = user.roles.length === 1 && user.roles[0] === UserRoleEnum.USER;

        return {
          id: order.id,
          cells: [
            {
              content: order.telephone,
            },
            {
              content: order.email,
            },
            {
              content: order.amount,
            },
            {
              content: order.colors,
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
  if (ordersError) {
    return <ErrorView title="Fetching users failed" error={ordersError} />;
  }

  // render view
  return (
    <>
      <div>Muugal orders</div>
      <div className="orders">
        {orders.map((order) => {
          return (
            <div
              className={"user"}
              onClick={() =>
                navigate({
                  pathname: buildUrl<AdminViewParams>(ADMIN_VIEW_PATH, {
                    menu: "orders",
                    page: "order",
                    modifier: order.id,
                  }),
                })
              }
            >
              <span>{order.id}</span>
              <span>{order.telephone}</span>
              <span>{order.email}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};
