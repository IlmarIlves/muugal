import { gql } from "@apollo/client";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminViewProps } from "../AdminView/AdminView";
import { ErrorView } from "../ErrorView/ErrorView";

// fetch filtered and paginated list of admin users
gql`
  query Users($filter: AdminUsersFilterInput, $pagination: PaginationInput, $match: MatchInput) {
    admin {
      users(filter: $filter, pagination: $pagination, match: $match) {
        skip
        take
        total
        users {
          ...AdminUserInfo
        }
      }
    }
  }
`;

interface UsersFilterData {
  userId: string;
  email: string;
  name: string;
  // status: UserStatusEnum[];
  // role: UserRoleEnum[];
  registeredAfter: Date | null;
  registeredBefore: Date | null;
  hasSubscription: boolean | null;
}

// TODO: implement pagination "show all"
export const UserListView: React.FC<AdminViewProps> = ({ viewer }) => {
  const navigate = useNavigate();

  // handle errors
  if (usersError) {
    return <ErrorView title="Fetching users failed" error={usersError} />;
  }

  // render view
  return (
    <>
      <div>users</div>
    </>
  );
};
