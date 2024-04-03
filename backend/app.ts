import express, { Express, Request, Response } from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { connectToDatabase } from "./database";
import userRoutes from "./routes/users.route";
import emailVerificationRoutes from "./routes/emailVerification.route"

const app: Express = express();

app.use(express.json());

let allowedOrigins = [/localhost:\d{4,5}$/];



const corsConfig = {
  origin: allowedOrigins,
  maxAge: 86400, // NOTICE: 1 day
  credentials: true,
};

app.use(cors(corsConfig));
app.use("/upload", express.static(path.join(__dirname, "../assets/upload")));

const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend"
);

if (fs.existsSync(reactIndexFile)) {
  //app.use(express.static(path.join(__dirname, "..", "..", "frontend")));

  app.get("*", (req: Request, res: Response) => {
    res.sendFile(reactIndexFile);
  });
}

connectToDatabase();


app.use(userRoutes);
app.use(emailVerificationRoutes)
app.use("/upload", express.static(path.join(__dirname, "../assets/upload")));

export default app;
