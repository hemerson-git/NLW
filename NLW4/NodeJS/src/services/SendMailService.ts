import nodemailer, { Transporter } from "nodemailer";
import fs from 'fs';
import handlebars from 'handlebars';

class SendMailService {
  private client: Transporter;

  constructor() {
    (async () => {
      const account = await nodemailer.createTestAccount();

      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    })();
  }

  async execute(to: string, subject: string, variables: object, path: string) {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');

    const mailTemplate = handlebars.compile(templateFileContent);
    const html = mailTemplate(variables);

    const message = await this.client.sendMail({
      to,
      subject,
      html,
      from: "NPS <noreply@nps.com.br>",
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export default new SendMailService();
