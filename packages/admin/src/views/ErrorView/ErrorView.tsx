import React from "react";
import { config } from "../../config";
import { getFieldErrors } from "../../services/getFieldErrors";
import { isAuthorizationError } from "../../services/isAuthorizationError";
import { isServerDownError } from "../../services/isServerDownError";
import { NotAuthorizedView } from "../NotAuthorizedView/NotAuthorizedView";
import { ServerDownView } from "../ServerDownView/ServerDownView";

export interface ErrorViewProps {
  error: Error | string;
  title?: string;
}

export const ErrorView: React.FC<ErrorViewProps> = ({ error, title }) => {
  const message =
    error instanceof Error
      ? config.debug
        ? error.message
        : "System error occured, we're working on the issue. Please try again later"
      : error;

  const fieldError = error instanceof Error ? getFieldErrors(error) : {};
  const containsValidationErrors = Object.keys(fieldError).length > 0;

  if (isServerDownError(error)) {
    return <ServerDownView error={error} />;
  }

  if (isAuthorizationError(error)) {
    return <NotAuthorizedView />;
  }

  return (
    <div>
      <span>Error view</span>
      <span>{message}</span>
    </div>
  );
};
