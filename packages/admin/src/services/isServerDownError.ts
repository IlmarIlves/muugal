import { ApolloError } from "@apollo/client";

export function isServerDownError(error: Error | string | undefined | null): error is ApolloError {
  if (!(error instanceof ApolloError)) {
    return false;
  }

  const { networkError } = error;

  if (!networkError) {
    return false;
  }

  if (networkError.name === "ServerParseError") {
    return true;
  }

  return false;
}
