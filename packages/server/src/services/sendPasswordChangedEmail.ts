import { PasswordChangedEmailParameters, getPasswordChangedEmailContents } from "./getPasswordChangedEmailContents";
import { sendEmail, SendEmailResult } from "./sendEmail";


export async function sendPasswordChangedEmail(info: PasswordChangedEmailParameters): Promise<SendEmailResult> {
  const contents = getPasswordChangedEmailContents(info);

  console.log({ info, contents }, "sending password has changed email");

  return sendEmail({
    recipients: [
      {
        email: info.email,
        name: info.name,
        type: "to",
      },
    ],
    ...contents,
  });
}
