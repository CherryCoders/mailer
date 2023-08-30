import { ReactElement } from "react";
import ReactDOMServer from "react-dom/server";

import { MailerType } from "../types/Mailer.js";
import { Nodemailer } from "../Nodemailer.js";

export class Render {
  constructor(
    public readonly templates?: MailerType.TemplatesOptions[],
    public readonly nodemailer?: Nodemailer
  ) {}

  react(templateName: string) {
    const template = this.getTemplate(templateName);

    if (!template?.render)
      throw new Error("Render não especificado no template");
    const render = ReactDOMServer.renderToString(template.render);
    return render;
  }

  async engineView(templateName: string, data: any = {}) {
    const ejs = await import("ejs");
    const template = this.getTemplate(templateName);

    if (!template?.path) throw new Error("Template inválido");

    const render = await ejs.renderFile(template.path, data);

    return render;
  }

  private getTemplate(templateName: string) {
    if (!this.templates) return;

    const template = this.templates.find((t) => t.name === templateName);

    return template;
  }
}
