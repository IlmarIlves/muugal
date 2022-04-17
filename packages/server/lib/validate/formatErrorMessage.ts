import { ErrorObject } from "ajv";
import { CustomValidatorDef } from "./customValidator";
import { formatInvalidFormatMessage } from "./formatInvalidFormatMessage";
import { formatSchemaMessage } from "./formatSchemaMessage";

export function formatErrorMessage(error: Partial<ErrorObject>, validators: CustomValidatorDef[]) {
  switch (error.keyword) {
    case "format":
      return formatInvalidFormatMessage(error, validators);

    default:
      return formatSchemaMessage(error);
  }
}
