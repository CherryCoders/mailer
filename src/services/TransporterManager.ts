import SMTPTransport from "nodemailer/lib/smtp-transport/index.js";
import { MailerType } from "./types/Mailer.js";
import nodemailer, { Transporter } from "nodemailer";
import { Nodemailer } from "./Nodemailer.js";

export class TransporterManager {
  public readonly mailers: any[] = [];

  constructor(private readonly client?: MailerType.Options) {}

  createManyNodemailerTransporter() {
    if (!this.client?.transporters) return;
    for (let transporter of this.client?.transporters) {
      this.mailers.push({
        name: transporter.name,
        transporter: nodemailer.createTransport(transporter.transport),
      });
    }
  }
  addTransport(templateName: string, option: SMTPTransport.Options): void {
    this.client?.transporters?.push({
      name: templateName,
      transport: option,
    });

    this.mailers.push({
      name: templateName,
      transporter: nodemailer.createTransport(option),
    });
  }

  removeTransport(templateName: string) {
    const templateIndex = this.client?.transporters?.findIndex(
      (p) => p.name === templateName
    );
    const transporterIndex = this.mailers.findIndex(
      (m) => m.name === templateName
    );

    if (!templateIndex) return;
    if (templateIndex < 0 || transporterIndex < 0)
      throw new Error("Este template não existe");
    this.client?.templates?.splice(templateIndex, 1);
    this.mailers.splice(transporterIndex, 1);
  }

  getTransport(templateName: string) {
    const mailer = this.mailers.find((m) => m.name === templateName);
    if (!mailer) throw new Error("mailer não encontrado");

    const manager = new Nodemailer(mailer.transporter, this.client);
    return manager;
  }
}
