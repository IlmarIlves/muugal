import { gql } from "@apollo/client";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Model } from "../../components/Model/Model";
import { useUserByIdQuery } from "../../generated/graphql";
import { AdminViewParams } from "../../routes";
import { dataUrlToFile } from "../../services/dataUrlToFile";
import { AdminViewProps } from "../AdminView/AdminView";
import { ErrorView } from "../ErrorView/ErrorView";
import "./orderDetailsView.scss";

// fetch filtered and paginated list of admin users
gql`
  query OrderById($orderId: ID!) {
    admin {
      order(orderId: $orderId) {
        id
        # email
        # telephone
        # colors
        # amount
        # data
        # mimeType
      }
    }
  }
`;

// TODO: implement pagination "show all"
export const OrdersDetailsView: React.FC<AdminViewProps> = ({ viewer }) => {
  const params = useParams<AdminViewParams>();

  // load user info
  const {
    data: orderData,
    loading: orderLoading,
    error: orderError,
  } = useOrderByIdQuery({
    variables: {
      orderId: params.id ?? "",
    },
  });

  // handle errors
  if (orderError) {
    return <ErrorView title="Fetching users failed" error={orderError} />;
  }

  const order = orderData?.admin.order;

  var buffer = Buffer.from(order!.fileUrl, "base64");

  const file = dataUrlToFile(order!.fileUrl, "rabbit.stl");

  console.log(file);

  // render view
  return (
    <>
      <div>Order details</div>
      <div className={"model"}>{/* <Model url={order!.data} mimeType={order!.mimeType} /> */}</div>
    </>
  );
};
