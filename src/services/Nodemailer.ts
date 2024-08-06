import { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport/index.js";
import { MailerType } from "./types/Mailer.js";
import { Render } from "./presentation/Render.js";
import Mail from "nodemailer/lib/mailer/index.js";

export class Nodemailer extends Render {
  private html: string | unknown = "";
  constructor(
    private readonly transporter: Transporter<SMTPTransport.SentMessageInfo>,
    private readonly client?: MailerType.Options
  ) {
    super(client?.templates);
  }

  async renderReact(templateName: string) {
    const html = await super.react(templateName);
    this.html = html;
    return this;
  }

  async renderEngineView(templateName: string, data?: any) {
    const html = await super.engineView(templateName, data);
    this.html = html;

    return this;
  }

  async renderEngineViewString(template: string, data?: any) {
    const html = super.engiveViewString(template, data);
    this.html = html;

    return this;
  }

  async send(mailOptions: Mail.Options) {
    if (this.html) mailOptions.html = this.html;

    return await this.transporter.sendMail(mailOptions);
  }
}
