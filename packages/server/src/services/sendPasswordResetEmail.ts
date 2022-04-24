import { getPasswordResetEmailContents, PasswordResetEmailParameters } from "./getPasswordResetEmailContents";
import { sendEmail, SendEmailResult } from "./sendEmail";


export async function sendPasswordResetEmail(info: PasswordResetEmailParameters): Promise<SendEmailResult> {
  const contents = getPasswordResetEmailContents(info);

  console.log({ info, contents }, "sending password has reset email");

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
