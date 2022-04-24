import { gql } from "@apollo/client";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FilterBaseData } from "../../components/Filter/Filter";
import { ConditionModeEnum, MatchModeEnum, useUsersQuery } from "../../generated/graphql";
import { useUrlParams } from "../../hooks/useUrlParams";
import { getSkipTake } from "../../services/getSkipTake";
import { AdminViewProps } from "../AdminView/AdminView";
import { ErrorView } from "../ErrorView/ErrorView";

// fetch filtered and paginated list of admin users
// gql`
//   query Payments {
//     admin {
//       payments {
//         id
//         userId
//         stripeSessionId
//         status
//         amount
//         currencyCode
//         emailUsedForPayment
//       }
//     }
//   }
// `;

interface UsersFilterData extends FilterBaseData {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  // status: UserStatusEnum[];
  // role: UserRoleEnum[];
}

// TODO: implement pagination "show all"
export const PaymentListView: React.FC<AdminViewProps> = ({ viewer }) => {
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

  // handle errors
  if (usersError) {
    return <ErrorView title="Fetching users failed" error={usersError} />;
  }

  // render view
  return (
    <>
      <div>Payments</div>
    </>
  );
};
