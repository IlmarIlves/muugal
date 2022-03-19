import { Format } from "ajv";
import { CustomValidatorDef, ValidatorsMap } from "./customValidator";

// maps list of default and custom validators to a map of validators with keys as names
export function getFormats(validators: CustomValidatorDef[]): ValidatorsMap {
  return validators.reduce<ValidatorsMap>((validatorMap, validator) => {
    validatorMap[validator.name] = {
      async: validator.async ?? false,
      validate: validator.validate,
    } as Format;

    return validatorMap;
  }, {});
}
