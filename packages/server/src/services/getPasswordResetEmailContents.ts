import html from "../../lib/html-literal/html";
import { EmailContents } from "./sendEmail";

export interface PasswordResetEmailParameters {
  email: string;
  name: string;
  generatedPassword: string;
}

export function getPasswordResetEmailContents(info: PasswordResetEmailParameters): EmailContents {
  return {
    subject: "Your password has been reset",
    textMessage: [`Hello ${info.name}!`, `Your password is reset`].join("\n"),
    htmlMessage: html`
      <p><strong>Hello ${info.name}!</strong></p>
      <br />
      <p>Your password has been reset by an admin</p>
      <br />
      <p>Your new password is ${info.generatedPassword}</p>
    `,
  };
}
