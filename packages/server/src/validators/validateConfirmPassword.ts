import { CustomValidator } from "../../lib/validate/customValidator";

export function validateConfirmPassword(newPassword: string, confirmPassword: string): CustomValidator<string> {
  return {
    name: "valid-confirm-password",
    validate: (_) => {
      return newPassword === confirmPassword;
    },
    formatError: (_error) => {
      return `New passwords does not match`;
    },
  };
}
