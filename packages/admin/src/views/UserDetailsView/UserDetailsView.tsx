import { gql } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { useUserByIdQuery } from "../../generated/graphql";

import { AdminViewParams, ViewerInfo } from "../../routes";
import { ErrorView } from "../ErrorView/ErrorView";

// fetch admin user by id
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

// type UserByIdQueryUserInfo = NonNullable<UserByIdQueryResult["data"]>["admin"]["user"];

export interface UserDetailsViewProps {
  viewer: ViewerInfo;
}

export const UserDetailsView: React.FC<UserDetailsViewProps> = ({ viewer }) => {
  const params = useParams<AdminViewParams>();

  // load user info
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useUserByIdQuery({
    variables: {
      userId: params.id ?? "",
    },
  });

  // get user info
  const user = userData?.admin.user;

  // handle error
  if (userError) {
    return <ErrorView title="Loading user info failed" error={userError} />;
  }

  // handle loading
  if (userLoading || !user) {
    return <div>loading</div>;
  }

  // render view
  return (
    <>
      {
        <div>
          <span>{user.id}</span>
          <span>{user.firstName}</span>
          <span>{user.lastName}</span>
        </div>
      }
    </>
  );
};
