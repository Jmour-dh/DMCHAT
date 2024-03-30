import { Request, Response } from "express";
import EmailVerification from "../models/emailVerification.model";
import { sendEmail } from "../utils/requestMailVerification";
import { generateVerificationCode } from "../utils/verifiedMailCode";

class EmailVerificationController {
  static async sendVerification(req: Request, res: Response): Promise<void> {
    try {
      // Récupérer l'email à vérifier à partir du corps de la requête
      const { email } = req.body;

      if (!email) {
        res.status(400).json({
          message:
            "L'adresse e-mail est requise pour l'envoi de la vérification.",
        });
        return;
      }

      // Générer un code de vérification aléatoire
      const verificationCode: string = generateVerificationCode();

      const emailVerification = new EmailVerification({
        email,
        verificationCode,
      });

      // Sauvegarder l'instance de MailVerification dans la base de données
      await emailVerification.save();

      // Envoyer l'email de vérification
      const emailOptions = {
        to: email,
        subject: "Vérification de votre adresse e-mail",
        text: `Votre code de vérification est : ${verificationCode}.`,
        html: `<b>Votre code de vérification est : ${verificationCode}.</b>`,
      };

      await sendEmail(emailOptions);

      // Répondre avec succès
      res
        .status(200)
        .json({ message: "Email de vérification envoyé avec succès." });
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi de l'email de vérification :",
        error
      );
      res.status(500).json({
        message: "Erreur lors de l'envoi de l'email de vérification.",
      });
    }
  }

  static async verifyEmail(req: Request, res: Response): Promise<void> {
    try {
      const { verificationCode } = req.body;
      console.info("req.body:", req.body);
      console.info("Code de vérification reçu:", verificationCode);
  
      const verificationEntry = await EmailVerification.findOne({
        verificationCode,
      });
  
      console.info("Entrée de vérification:", verificationEntry);
      if (!verificationEntry) {
        console.info("Code de vérification introuvable ou expiré.");
        res
          .status(404)
          .json({
            message: "Le code de vérification est invalide ou a expiré.",
          });
        return;
      }
  
      // Mettre à jour le statut verified de l'entrée de vérification
      verificationEntry.verified = true;
      await verificationEntry.save();
  
      res.status(200).json({ message: "Email vérifié avec succès." });
    } catch (error: any) {
      console.error("Erreur lors de la vérification de l'email:", error);
      res.status(500).json({ error: error.message });
    }
  }
  
}

export default EmailVerificationController;
