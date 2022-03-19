import { UserInputError } from "apollo-server-core";
import { JSONObject } from "../json";
import { FieldValidationErrorMap } from "./formatValidationError";

export class ValidationError<T extends JSONObject> extends UserInputError {
  constructor(public errors: FieldValidationErrorMap<T> = {}) {
    super("Validation failed", {
      errors,
    });
  }
}
