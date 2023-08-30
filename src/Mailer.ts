import { TemplatesManager } from "./services/TemplatesManager.js";
import { TransporterManager } from "./services/TransporterManager.js";
import { MailerType } from "./services/types/Mailer.js";

export class Mailer {
  public template: TemplatesManager;
  public transporter: TransporterManager;

  constructor(
    public options: MailerType.Options = {
      templates: [],
      transporters: [],
    }
  ) {
    this.template = new TemplatesManager(options);
    this.transporter = new TransporterManager(options);
  }

  start() {
    this.transporter.createManyNodemailerTransporter();
  }
}
