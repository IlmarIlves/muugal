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
// fetch admin user by id
gql`
  query PaymentById($paymentId: ID!) {
    admin {
      payment(paymentId: $paymentId) {
        id
        userId
        stripeSessionId
        status
        amount
        currencyCode
        emailUsedForPayment
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
export const PaymentDetailsView: React.FC<AdminViewProps> = ({ viewer }) => {
  const navigate = useNavigate();

  //   // handle errors
  //   if (userError) {
  //     return <ErrorView title="Fetching users failed" error={usersError} />;
  //   }

  // render view
  return (
    <>
      <div>user details</div>
    </>
  );
};
