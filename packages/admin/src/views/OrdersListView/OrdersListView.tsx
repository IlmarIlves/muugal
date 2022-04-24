import { gql } from "@apollo/client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FilterBaseData } from "../../components/Filter/Filter";
import { useUrlParams } from "../../hooks/useUrlParams";
import { getSkipTake } from "../../services/getSkipTake";
import { AdminViewProps } from "../AdminView/AdminView";
import { ErrorView } from "../ErrorView/ErrorView";

// fetch filtered and paginated list of admin users
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
  // const { data: usersData, loading: usersLoading, error: usersError } = useQ();

  // handle errors
  // if (usersError) {
  //   return <ErrorView title="Fetching users failed" error={usersError} />;
  // }

  // render view
  return (
    <>
      <div>Orders</div>
    </>
  );
};
