import emailMailer from "nodemailer";
export default class Email {
  static nodemailer = emailMailer;
  static #configEmail() {
    console.log(process.env.EMAIL_YAHOO);
    
    const config = this.nodemailer.createTransport({
      service: "yahoo",
      auth: {
        user: process.env.EMAIL_YAHOO,
        pass: process.env.SENHA_APLICATIVO_YAHOO,
      },
    });
    return config;
  };

  
  static async sendEmail(userEmail, title, text) {
    try {
      const email = this.#configEmail();

      return await email.sendMail({
        from: process.env.EMAIL_YAHOO,
        to: userEmail,
        subject: title,
        text: text,
      });

    } catch (error) {
      console.log(error);
      
      throw new Error(`error sending email`);
    };
  };
};

