import { ApolloError } from "@apollo/client";
import React, { useState } from "react";

export interface ServerDownViewProps {
  error: ApolloError;
}

export const ServerDownView: React.FC<ServerDownViewProps> = ({ error }) => {
  const [showDetails, setShowDetails] = useState(false);

  return <div>server down</div>;
};
