import html from "../../lib/html-literal/html";
import { EmailContents } from "./sendEmail";

export interface GetUserRegisterEmailParameters {
    email: string;
    name: string;
  }
  

export function getUserRegisterEmailContents(info: GetUserRegisterEmailParameters): EmailContents {
  return {
    subject: "You have registered",
    textMessage: [`Hello ${info.name}!`, `User registered`].join("\n"),
    htmlMessage: html`
      <p><strong>Hello ${info.name}!</strong></p>
      <br />
      <p>You have registered </p>
      <br />
    `,
  };
}
