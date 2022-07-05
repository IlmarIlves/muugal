import { OperationVariables } from "@apollo/client";
import { GraphQLError } from "graphql";

// map of errors s with keys from template type and values of string arrays (can have multiple errors per field)
export type ErrorsMap<T> = { [key in keyof T]?: string[] };

// validation graphql error interface
export interface ValidationGraphQLError<TVariables = OperationVariables> extends GraphQLError {
  extensions: {
    code: "BAD_USER_INPUT";
    exception: {
      errors: ErrorsMap<TVariables>;
    };
  };
}

export function isValidationGraphQLError<TVariables = OperationVariables>(
  error: GraphQLError,
): error is ValidationGraphQLError<TVariables> {
  return (
    error.extensions !== undefined &&
    error.extensions.code === "BAD_USER_INPUT" &&
    error.extensions.exception !== undefined
  );
}
