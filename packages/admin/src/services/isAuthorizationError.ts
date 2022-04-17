export function isAuthorizationError(error: Error | string | undefined | null) {
    const notAuthorizedMessage = "Not authorized";
  
    if (typeof error === "string" && error.includes(notAuthorizedMessage)) {
      return true;
    }
  
    if (!(error instanceof Error)) {
      return false;
    }
  
    return error.message.includes(notAuthorizedMessage);
  }
  