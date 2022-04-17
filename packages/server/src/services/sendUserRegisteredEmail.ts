import { getUserRegisterEmailContents, GetUserRegisterEmailParameters } from "./getUserRegisterEmailContents";
import { sendEmail, SendEmailResult } from "./sendEmail";




export async function sendUserReigisterEmail(info: GetUserRegisterEmailParameters): Promise<SendEmailResult> {
  const contents = getUserRegisterEmailContents(info);

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
