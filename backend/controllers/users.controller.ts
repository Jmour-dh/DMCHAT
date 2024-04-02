import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import User from "../models/users.model";
import ExpiredSessionToken from "../models/expiredSessionToken.model";
import ResetPassword from "../models/resetPassword.model";
import { sendEmail } from "../utils/requestMailVerification";

class UserController {
  
  static async create(req: Request, res: Response): Promise<void> {
    try {
      // Vérifiez si req.file existe avant d'accéder à req.file.filename
      const profileImage = req.file ? req.file.filename : undefined;
  
      const { pseudo, email, password, firstName, lastName, sexe } = req.body;
  
      const newUser = await User.create({
        pseudo,
        email,
        password,
        firstName,
        lastName,
        sexe,
        profileImage,
        role: "user",
      });
  
      // Répondre avec le nouvel utilisateur créé
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error);
      res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
    }
  }
  
  


  static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);

      if (!user) {
        res.status(404).json({ message: "Utilisateur non trouvé" });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de l'utilisateur par ID :",
        error
      );
      res.status(500).json({
        message: "Erreur lors de la récupération de l'utilisateur par ID",
      });
    }
  }

  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.find();

      res.status(200).json(users);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de tous les utilisateurs :",
        error
      );
      res.status(500).json({
        message: "Erreur lors de la récupération de tous les utilisateurs",
      });
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const updateData = req.body;
      const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
      });

      if (!updatedUser) {
        res.status(404).json({ message: "Utilisateur non trouvé" });
        return;
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;

      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
        res.status(404).json({ message: "Utilisateur non trouvé" });
        return;
      }

      res.status(200).json({ message: "Utilisateur est supprimé" });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la suppression de l'utilisateur" });
    }
  }

  static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        res.status(401).json({
          authenticationFailed: true,
          message: "L'adresse e-mail ou le mot de passe est incorrect.",
        });
        return;
      }

      // Transmettre l'utilisateur et le mot de passe à la fonction verifyPassword
      req.body.user = user;
      req.body.password = password;
      next();
    } catch (err: any) {
      console.error("Erreur lors de la connexion :", err);
      res
        .status(500)
        .json({ message: "Erreur interne du serveur lors de la connexion." });
    }
  }

  static async logout(req: Request, res: Response): Promise<void> {
    try {
      // Vérifiez si le jeton est présent dans les en-têtes de la requête
      const token = req.headers.authorization?.replace(/^Bearer\s+/, "");

      if (!token) {
        res.sendStatus(401); // Jeton non fourni
        return;
      }

      // Enregistrez le jeton expiré dans la collection appropriée
      const newExpiredSessionToken = new ExpiredSessionToken({
        jwtToken: token,
      });
      await newExpiredSessionToken.save();

      res.status(204).send("Déconnexion réussie");
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur lors de la déconnexion");
    }
  }

  static async updatePassword(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;
    const newPassword = req.body.password;

    try {
      const result = await User.findByIdAndUpdate(userId, {
        password: newPassword,
      });

      if (!result) {
        res.sendStatus(404);
      } else {
        res.status(204).send("Mot de passe mis à jour avec succès");
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  static async getUserByEmail(req: Request, res: Response): Promise<void> {
    const { Email } = req.body;
    console.info(Email);
    try {
      const user = await User.findOne({ email: Email });
      if (user != null) {
        const uniqueKey = crypto.randomBytes(32).toString("hex");
        const resetPasswordData = { uniqueKey, Email };
        await ResetPassword.create(resetPasswordData);

        res.status(200).send(resetPasswordData);

        const emailUser = await sendEmail({
          to: "dhiaeddinejm@gmail.com",
          subject: "Réinitialisation de votre mot de passe",
          text: `Bonjour, vous avez demandé la réinitialisation de votre mot de passe. Veuillez cliquer sur ce lien pour changer votre mot de passe : http://localhost:3000/resetpassword/${uniqueKey}`,
          html: `Bonjour, vous avez demandé la réinitialisation de votre mot de passe. Veuillez cliquer sur ce lien pour changer votre mot de passe : http://localhost:3000/resetpassword/${uniqueKey}`,
        });

        if (emailUser) {
          console.info("Email sent");
        } else {
          console.info("Email not sent");
        }
      } else {
        res.status(404).send("Utilisateur non trouvé");
      }
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .send(
          "Erreur lors de la récupération des données depuis la base de données"
        );
    }
  }

  static async verifyKey(req: Request, res: Response): Promise<void> {
    const { key } = req.body;
    console.info(key);

    try {
      const resetPasswordData = await ResetPassword.findOne({ uniqueKey: key });

      if (resetPasswordData) {
        const currentTime = new Date();
        const expirationTime = resetPasswordData.expires_at;

        if (currentTime > expirationTime) {
          res.status(400).send(true);
          return;
        }
      }

      res.status(200).send(false);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  static async resetPassword(req: Request, res: Response): Promise<void> {
    const { password, key } = req.body;
    console.info(password, key);

    if (!key) {
      res.sendStatus(400);
      return;
    }

    try {
      const resetPasswordData = await ResetPassword.findOne({ uniqueKey: key });

      if (resetPasswordData) {
        await User.updateOne(
          { email: resetPasswordData.Email },
          { password: password }
        );
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

  static async verifyPseudoAvailability(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const existingUser = await User.findOne({ pseudo: req.body.pseudo });

      if (existingUser) {
        res.status(400).json({ message: "Le pseudo existe déjà." });
      } else {
        res.status(200).json({ message: "Le pseudo est disponible." });
      }
    } catch (err: any) {
      console.error(
        "Erreur lors de la vérification de l'utilisateur existant :",
        err
      );
    }
  }

  static async verifyEmailAvailability(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const existingUser = await User.findOne({ email: req.body.email });

      if (existingUser) {
        res.status(400).json({ message: "L'email' existe déjà." });
      } else {
        res.status(200).json({ message: "L'email' est disponible." });
      }
    } catch (err: any) {
      console.error(
        "Erreur lors de la vérification de l'utilisateur existant :",
        err
      );
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default UserController;
