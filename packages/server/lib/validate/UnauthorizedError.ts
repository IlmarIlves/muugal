export class UnauthorizedError extends Error {
    constructor() {
      super("Unauthorized, please correctly setup graphql authorize, this should not happen");
    }
  }
  