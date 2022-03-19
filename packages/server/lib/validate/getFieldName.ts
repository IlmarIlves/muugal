import { ErrorObject } from "ajv";
import { JSONObject } from "../json";

export function getFieldName<T extends JSONObject>(error: Partial<ErrorObject>, data: T): keyof T | undefined {
  if (!error.instancePath) {
    return undefined;
  }

  const fieldNames = Object.keys(data);

  // attempt to find exact match first
  for (const fieldName of fieldNames) {
    if (error.instancePath.substring(1) === fieldName) {
      return fieldName;
    }
  }

  // attempt to find partial match
  for (const fieldName of fieldNames) {
    if (error.instancePath.includes(fieldName)) {
      return fieldName;
    }
  }

  // no match found
  return undefined;
}
