import Ajv, { ErrorObject } from "ajv";
import ajvErrors from "ajv-errors";
import addFormats from "ajv-formats";
import { JSONSchema4 } from "json-schema";
import { validateExistingUser } from "../../src/validators/validateExistingUser";
import { validateUniqueEmail } from "../../src/validators/validateUniqueEmail";
import { JSONObject } from "../json";
import { CustomValidatorDef } from "./customValidator";
import { formatValidationError } from "./formatValidationError";
import { getFormats } from "./getFormats";
import { ValidationError } from "./ValidationError";


// list of default validators always available
const defaultValidators: CustomValidatorDef[] = [
  validateUniqueEmail(),
  validateExistingUser(),
];

// TODO: not sure how to get ValidationError from Ajv typings directly
interface AjvValidationError extends Error {
  readonly errors: Partial<ErrorObject>[];
  readonly ajv: true;
  readonly validation: true;
}

export async function validate(data: JSONObject, schema: JSONSchema4, extraValidators?: CustomValidatorDef[]) {
  // configure validator
  const validators = [...defaultValidators, ...(extraValidators ? extraValidators : [])];
  const ajv = new Ajv({
    allErrors: true,
    // jsonPointers: true,
    // async: true,
    formats: getFormats(validators),
  });

  // add support for json schema defaults formats (email etc)
  addFormats(ajv);

  // add support for custom error messages
  ajvErrors(ajv);

  // compile schema
  const validate = ajv.compile({
    $async: true,
    ...schema,
  });

  // perform validation
  try {
    // convert to JSON (stringifies dates etc)
    const jsonData = JSON.parse(JSON.stringify(data));

    // eslint-disable-next-line @typescript-eslint/await-thenable
    await validate(jsonData);

    return true;
  } catch (error) {
    const { message, errors } = error as AjvValidationError;

    // log validation error with details
    console.log(
      {
        message,
        error,
        errors,
        schema,
        data,
      },
      "validation failed",
    );

    // rethrow unknown errors
    if (!(error instanceof Ajv.ValidationError)) {
      throw error;
    }

    // extract field errors
    const fieldErrors = formatValidationError(data, error, validators);

    // throw original error if no field errors could be extracted
    if (Object.keys(fieldErrors).length === 0) {
      throw error;
    }

    // throw field validation error
    throw new ValidationError(fieldErrors);
  }
}
