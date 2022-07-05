import { isApolloError, OperationVariables } from "@apollo/client";
import { FieldError } from "react-hook-form";
import { isValidationGraphQLError } from "./isValidationGraphqlError";

export type FieldErrorsMap<TVariables = OperationVariables> = { [key in keyof TVariables]?: FieldError };

export function getFieldErrors<TVariables = OperationVariables>(
  error: Error | undefined,
  validationErrors: FieldErrorsMap<TVariables> = {},
): FieldErrorsMap<TVariables> {
  // build field error map
  const result: FieldErrorsMap<TVariables> = { ...validationErrors };

  // return if there is no error (so the function can be called without error)
  if (!error) {
    return result;
  }

  // return if given error is not an apollo error
  if (!isApolloError(error)) {
    return result;
  }

  // extract graphql errors
  const { graphQLErrors } = error;

  // resolve field errors
  graphQLErrors.forEach((graphqlError) => {
    // skip if not validation graphql error
    if (!isValidationGraphQLError<TVariables>(graphqlError)) {
      return;
    }

    // get errors
    const errors = graphqlError.extensions.exception.errors;
    const fieldNames = Object.keys(errors) as (keyof TVariables)[];

    // add server side errors
    fieldNames.forEach((fieldName) => {
      const fieldErrors = errors[fieldName];

      if (!fieldErrors) {
        return;
      }

      // add field errors to result
      result[fieldName] = {
        type: "validate",
        message: fieldErrors.join(", "),
      };
    });
  });

  return result;
}
