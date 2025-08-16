import { IEmailLocals } from "@muhammadjalil8481/jobber-shared";
import { config } from "@notification/config";
import Email from "email-templates";
import nodemailer from "nodemailer";
import path from "path";

interface SendEmailParams {
  template: string;
  reciever: string;
  locals: IEmailLocals;
}

export async function sendEmail({
  template,
  reciever,
  locals,
}: SendEmailParams): Promise<void> {
  let transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: Number(config.SMTP_PORT),
    secure: false,
    auth: {
      user: config.SENDER_EMAIL_NAME,
      pass: config.SENDER_EMAIL_PASSWORD,
    },
  });

  const email: Email = new Email({
    message: {
      from: config.SENDER_EMAIL,
    },
    send: true,
    preview: false,
    transport: transporter,
    views: {
      options: {
        extension: "ejs",
      },
    },
    juice: true, // Enable juice for inlining CSS
    juiceResources: {
      preserveImportant: true, // Preserve important CSS rules,
      webResources: {
        relativeTo: path.join(__dirname, `.../build`),
      },
    },
  });

  await email.send({
    template: path.join(__dirname, "..", "emails", template),
    message: {
      to: reciever,
    },
    locals,
  });
}
