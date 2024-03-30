import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

const sendEmail = async ({ to, subject, text, html }: EmailOptions): Promise<boolean> => {
  // Configuration de Nodemailer pour Gmail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "dhiaeddinejm@gmail.com", 
      pass: process.env.GMAIL_APP_PASS as string,
    },
  });

  // Options de l'email
  const emailOptions: nodemailer.SendMailOptions = {
    from: '"DMCHAT" <dhiaeddinejm@gmail.com>',
    to, 
    subject,
    text: text ? text : `Bonjour et bienvenue, vous trouverez ici votre code de vérification : ${html}. Vous avez 15 minutes pour valider votre inscription.`,
    html: html ? html : `<b>Bonjour et bienvenue, vous trouverez ici votre code de vérification : ${text}. Vous avez 15 minutes pour valider votre inscription.</b>`,
  };

  // Envoi de l'email
  try {
    const info = await transporter.sendMail(emailOptions);
    console.info("Email sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email: ", error);
    return false;
  }
};



export { sendEmail };
