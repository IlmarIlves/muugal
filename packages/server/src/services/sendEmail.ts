import { config } from "../config";
import { Mandrill } from "mandrill-api";


export enum EmailStatus {
  SENT = "sent",
  QUEUED = "queued",
  SCHEDULED = "scheduled",
  REJECTED = "rejected",
  INVALID = "invalid",
  ERROR = "error",
}

export type EmailType = "to" | "cc" | "bcc";

export interface EmailImage {
  type: string;
  name: string;
  content: string;
}

export interface EmailAttachment {
  type: string;
  name: string;
  content: string;
}

export interface EmailContents {
  subject: string;
  htmlMessage: string;
  textMessage: string;
  images?: EmailImage[];
  attachments?: EmailAttachment[];
}

export interface EmailRecipient {
  email: string;
  name?: string;
  type: EmailType;
}

export interface EmailSettings {
  recipients: EmailRecipient[];
  apiKey?: string;
  fromEmail?: string;
  fromName?: string;
  debug?: boolean;
}

export type EmailOptions = EmailSettings & EmailContents;

export interface SendEmailResult {
  success: boolean;
  status: EmailStatus;
  timeTaken: number;
  error?: string;
}

export interface SendResult {
  status: EmailStatus;
  reject_reason: string;
}

export interface SendError {
  message: string;
  code: string;
}

const successStatuses = [EmailStatus.SENT, EmailStatus.QUEUED, EmailStatus.SCHEDULED];

export async function sendEmail(userOptions: EmailOptions): Promise<SendEmailResult> {
  // reject the email if not enabled
  if (!config.email.enabled) {
    return {
      success: false,
      error: "Sending email is not enabled in the settings",
      status: EmailStatus.REJECTED,
      timeTaken: 0,
    };
  }

  // combine defaults with user provided options
  const options: Required<EmailOptions> = {
    apiKey: process.env.MYSQL_DB!,
    fromEmail: config.email.fromEmail,
    fromName: config.email.fromName,
    debug: false,
    images: [],
    attachments: [],
    ...userOptions,
  };

  // don't attempt to send email if missing api key
  if (config.email.apiKey.length === 0) {
    // no need to include options for safety reason error itself should be self-explanatory
    console.log("sending email requested but the API key has not been set");

    throw new Error("Sending email is enabled but API key is empty, please check your configuration");
  }

  return new Promise<SendEmailResult>((resolve) => {
    const client = new Mandrill(options.apiKey, options.debug);
    const startTime = Date.now();

    const isEmailListEmpty = options.recipients.length === 0;

    if (isEmailListEmpty) {
      console.log({ userOptions }, "failed to send email, no email to send email to");

      resolve({
        success: false,
        status: EmailStatus.ERROR,
        timeTaken: Date.now() - startTime,
        error: "failed to send email, no email to send email to",
      });

      return;
    }

    client.messages.send(
      {
        message: {
          subject: options.subject,
          html: options.htmlMessage,
          text: options.textMessage,
          from_email: options.fromEmail,
          from_name: options.fromName,
          to: options.recipients,
          headers: {
            "Reply-To": options.fromEmail,
          },
          images: options.images,
          attachments: options.attachments,
        },
        async: false,
      },
      (response) => {
        const results = response as SendResult[];

        if (results.length < 1) {
          throw new Error(`Expected at least one response`);
        }

        const result = results[0];
        const success = successStatuses.indexOf(result.status) !== -1;
        const error = success ? undefined : result.reject_reason;
        const timeTaken = Date.now() - startTime;

        if (success) {
            console.log({ options, result, timeTaken }, "sent email");
        } else {
            console.log({ options, result, error, timeTaken }, "attempted to send email but got failure response");
        }

        resolve({
          success,
          status: result.status,
          timeTaken,
          error,
        });
      },
      (e) => {
        const error = e as SendError;
        const timeTaken = Date.now() - startTime;

        console.log({ options, error, timeTaken }, "sending email failed");

        resolve({
          success: false,
          status: EmailStatus.ERROR,
          timeTaken,
          error: `${error.message} [${error.code}]`,
        });
      },
    );
  });
}
