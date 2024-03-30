import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL non défini dans le fichier .env");
}

export const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(DATABASE_URL, {
      dbName: 'myirc'
    });
    console.log("Connecté à MongoDB");
  } catch (error) {
    console.error("Impossible de se connecter à MongoDB", error);
  }
};
