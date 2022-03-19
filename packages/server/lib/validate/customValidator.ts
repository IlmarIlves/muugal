import { ErrorObject, Format } from "ajv";
import { AsyncFormatValidator, FormatValidator } from "ajv/dist/types";

export type ValidatorsMap = {
  [x: string]: Format;
};

export type ValidationErrorFormatterFn = (error: Partial<ErrorObject>) => string;

export type CustomValidator<T extends string | number = string | number> =
  | {
      async: true;
      name: string;
      validate: AsyncFormatValidator<T>;
      formatError: ValidationErrorFormatterFn;
    }
  | {
      async?: false | undefined;
      name: string;
      validate: FormatValidator<T>;
      formatError: ValidationErrorFormatterFn;
    };

export type CustomValidatorDef = CustomValidator<string> | CustomValidator<number>;
