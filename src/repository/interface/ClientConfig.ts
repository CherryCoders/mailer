import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

nodemailer.createTransport();
export type TemplateEmailOption = {
  name: string;
  path: string;
  render: string;
};

export type TransportersOptionsNodeMailer = {
  name: string;
  transport: SMTPTransport[] | string | SMTPTransport.Options;
};

export interface ClientConfig {
  transporters?: TransportersOptionsNodeMailer[];
  templates: TemplateEmailOption[];
}
