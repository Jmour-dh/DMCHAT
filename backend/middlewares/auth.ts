import { Request, Response, NextFunction } from "express";
import * as argon2 from "argon2";
import jwt, { SignOptions } from "jsonwebtoken";
import ExpiredSessionToken from "../models/expiredSessionToken.model";
import dotenv from "dotenv";

dotenv.config();

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

interface Sign {
  payload: string | Buffer | object;
  secretOrPrivateKey: string;
  options?: SignOptions;
}

const hashPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const hash = await argon2.hash(req.body.password, hashingOptions);
    req.body.password = hash;
    next();
  } catch (err: any) {
    console.error(err);
    res.sendStatus(500);
  }
};

const verifyPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.body.user) {
      res.status(401).send("Utilisateur non authentifié");
      return;
    }

    const { password } = req.body;
    const isVerified = await argon2.verify(req.body.user.password, password);

    if (isVerified) {
      const payload: string | object | Buffer = { sub: req.body.user._id };
      const signOptions: SignOptions = { expiresIn: "4h" };
      const secretKey =
        process.env.SECRET_JWT ||
        "3692402f858fadac61af07f83980f58aff8617614301127da89f77a08df0b70e0722273c48b95e163ee5a77393c5fe25d7e1ba8ed23c0596d9a8ab3a5dd95230";
      const signData: Sign = {
        payload,
        secretOrPrivateKey: secretKey,
        options: signOptions,
      };
      const token = jwt.sign(
        signData.payload,
        signData.secretOrPrivateKey,
        signData.options
      );

      res.status(200).send({
        authToken: token,
        user: req.body.user,
        message: "Connexion réussie",
      });
    } else {
      res.status(401).send("Mot de passe incorrect");
    }
  } catch (err: any) {
    console.error("Erreur lors de la vérification du mot de passe :", err);
    res.sendStatus(500);
  }
};

const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res
        .status(401)
        .send("Vous n'avez pas l'autorisation d'accéder à cette ressource");
      return;
    }

    if (!authHeader.startsWith("Bearer ")) {
      res.status(401).send({
        message: "Le header Authorization n'est pas au format 'Bearer'",
      });
      return;
    }

    const token = authHeader.replace(/^Bearer\s+/, "");

    // Vérification de la présence du token dans la liste des tokens expirés
    const result = await ExpiredSessionToken.findOne({ jwtToken: token });

    if (result) {
      res.status(401).send("Session expirée. Veuillez vous reconnecter.");
      return;
    }

    // Vérification du jeton JWT
    await new Promise<void>((resolve, reject) => {
      jwt.verify(token, process.env.SECRET_JWT || "3692402f858fadac61af07f83980f58aff8617614301127da89f77a08df0b70e0722273c48b95e163ee5a77393c5fe25d7e1ba8ed23c0596d9a8ab3a5dd95230", (err, decoded) => {
        if (err) {
          console.error("Erreur de vérification du jeton JWT :", err);
          reject(new Error("Non autorisé"));
        } else {
          if (!decoded) {
            reject(new Error("Non autorisé"));
            return;
          }
          (req as any).user = { _id: decoded.sub };
          resolve();
        }
      });
    });

    next();
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la vérification du jeton");
  }
};

const expiredSessionToken = async (req: Request, res: Response): Promise<void> => {
  try {
    // Vérifiez si le jeton est présent dans les en-têtes de la requête
    const token = req.headers.authorization?.replace(/^Bearer\s+/, "");

    if (!token) {
      res.sendStatus(401); // Jeton non fourni
      return;
    }

    // Enregistrez le jeton expiré dans la collection appropriée
    const newExpiredSessionToken = new ExpiredSessionToken({ jwtToken: token });
    await newExpiredSessionToken.save();

    res.status(204).send("Déconnexion réussie");
  } catch (error) {
    console.error(error);
    res.sendStatus(500); // Erreur serveur
  }
};

export { hashPassword, verifyPassword, verifyToken, expiredSessionToken };
