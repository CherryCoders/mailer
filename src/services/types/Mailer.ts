import Mail from "nodemailer/lib/mailer/index.js";
import SMTPTransport from "nodemailer/lib/smtp-transport/index.js";
import { ReactElement } from "react";

export declare namespace MailerType {
  type TemplatesOptions = {
    name: string;
    path?: any;
    render?: ReactElement;
  };

  export type TransporterOption = {
    name: string;
    transport: SMTPTransport.Options;
  };
  type SenderOptions = {
    name: string;
    mail: Mail.Options;
  };

  type Options = {
    transporters?: TransporterOption[];
    templates?: TemplatesOptions[];
  };
}
