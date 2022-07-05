import { isApolloError } from "@apollo/client";
import { isValidationGraphQLError } from "./isValidationGraphqlError";

export function isSystemError(error: Error | undefined): error is Error {
  // return false if no error was given
  if (error === undefined) {
    return false;
  }

  // consider as not validation error if not from Apollo
  if (!isApolloError(error)) {
    return true;
  }

  // extract graphql errors
  const { graphQLErrors } = error;

  // return false if there are no graphql errors
  if (graphQLErrors.length === 0) {
    return true;
  }

  return graphQLErrors.find((graphQLError) => isValidationGraphQLError(graphQLError)) === undefined;
}
