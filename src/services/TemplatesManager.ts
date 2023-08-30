import { MailerType } from "./types/Mailer.js";

export class TemplatesManager {
  public list?: MailerType.TemplatesOptions[];

  constructor(private readonly client?: MailerType.Options) {
    this.list = client?.templates;
  }

  addTemplate(templateName: string, option: MailerType.TemplatesOptions): void {
    option.name = templateName;
    this.client?.templates?.push(option);
  }

  removeTemplate(templateName: string) {
    const templateIndex = this.client?.templates?.findIndex(
      (p) => p.name === templateName
    );

    if (!templateIndex) return;
    if (templateIndex < 0) throw new Error("Este template não existe");
    this.client?.templates?.splice(templateIndex, 1);
  }

  updateTemplate(templateName: string, option: MailerType.TemplatesOptions) {
    const templateIndex = this.client?.templates?.findIndex(
      (p) => p.name === templateName
    );

    if (!templateIndex) return;
    if (templateIndex < 0) throw new Error("Este template não existe");

    if (!this.client?.templates) return;
    this.client.templates[templateIndex] = {
      ...this.client.templates[templateIndex],
      ...option,
    };
  }
}
