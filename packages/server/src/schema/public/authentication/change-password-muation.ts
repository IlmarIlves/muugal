import { mutationField, nullable, stringArg } from "@nexus/schema";
import { JSONSchema4 } from "json-schema";
import { validate } from "../../../../lib/validate/validate";
import { sendPasswordChangedEmail } from "../../../services/sendPasswordChangedEmail";
import { validateConfirmPassword } from "../../../validators/validateConfirmPassword";
import { validatePassword } from "../../../validators/validatePassword";


const schema: JSONSchema4 = {
  $async: true,
  type: "object",
  properties: {
    currentPassword: {
      title: "Current password",
      type: "string",
    },
    newPassword: {
      title: "New password",
      type: "string",
      minLength: 8,
      format: "valid-confirm-password",
    },
    confirmPassword: {
      title: "Confirmation password",
      type: "string",
      minLength: 8,
    },
  },
  required: ["newPassword", "confirmPassword"],
};

export default mutationField("changePassword", {
  type: "Viewer",
  description: "Changes current user password",
  args: {
    currentPassword: stringArg({ description: "Current password" }),
    newPassword: stringArg({ description: "New password" }),
    confirmPassword: stringArg({ description: "Confirmation password" }),
  },
  resolve: async (_parent, args, context) => {
    // extract arguments
    const { newPassword, confirmPassword } = args;
    const { viewer } = context;

    // can be null, if logged in via SSO (Single Sign-On [Facebook, Google, Apple])
    const hasSetPassword = viewer.passwordSalt !== null;

    let validationRules = [validateConfirmPassword(newPassword, confirmPassword)];

    if (hasSetPassword) {
      validationRules = [validatePassword(viewer.email), ...validationRules];
    }

    // validate arguments
    await validate(args, schema, validationRules);

    await viewer.updatePassword(newPassword);

    const changePasswordEmail = await sendPasswordChangedEmail({ name: viewer.name, email: viewer.email });

    console.log(
      {
        viewer,
        changePasswordEmail,
      },
      "user changed password",
    );

    return viewer;
  },
});
