import { ErrorObject } from "ajv";
import { CustomValidatorDef } from "./customValidator";
import { isFormatError } from "./isFormatError";

export function formatInvalidFormatMessage(error: Partial<ErrorObject>, validators: CustomValidatorDef[]): string {
  const { params } = error;

  if (!params) {
    return `Please use valid format`;
  }

  if (!isFormatError(params)) {
    return error.message || "Invalid format";
  }

  const format = params.format;
  const validator = validators.find((validator) => validator.name === format);

  if (!validator) {
    switch (format) {
      case "email":
        return `Please enter valid email`;
    }

    // the error message is not translated so use a generic message
    return `Please use valid format`;
  }

  return validator.formatError(error);
}
