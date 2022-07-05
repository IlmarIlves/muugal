import React from "react";
import { getFieldErrors } from "../../services/getFieldErrors";

export interface ErrorViewProps {
  error: Error | string;
  title?: string;
}

export const ErrorView: React.FC<ErrorViewProps> = ({ error, title }) => {
  const fieldError = error instanceof Error ? getFieldErrors(error) : {};
  const containsValidationErrors = Object.keys(fieldError).length > 0;

  return (
    <div>
      <span>Error view</span>
    </div>
  );
};
