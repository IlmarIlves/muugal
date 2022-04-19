import html from "../../lib/html-literal/html";
import { EmailContents } from "./sendEmail";

export interface PasswordChangedEmailParameters {
  email: string;
  name: string;
}

export function getPasswordChangedEmailContents(info: PasswordChangedEmailParameters): EmailContents {
  return {
    subject: "Your password has been changed",
    textMessage: [`Hello ${info.name}!`, `Your password is updated`].join("\n"),
    htmlMessage: html`
      <p><strong>Hello ${info.name}!</strong></p>
      <br />
      <p>Your password is updated</p>
    `,
  };
}
