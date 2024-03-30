import express, { Express, Request, Response } from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { connectToDatabase } from "./database";
import userRoutes from "./routes/users.route";
import emailVerificationRoutes from "./routes/emailVerification.route"

const app: Express = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/upload", express.static(path.join(__dirname, "../assets/upload")));

const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend"
);

if (fs.existsSync(reactIndexFile)) {
  app.use(express.static(path.join(__dirname, "..", "..", "frontend")));

  app.get("*", (req: Request, res: Response) => {
    res.sendFile(reactIndexFile);
  });
}

connectToDatabase();


app.use(userRoutes);
app.use(emailVerificationRoutes)

export default app;
