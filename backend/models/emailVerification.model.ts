import mongoose, { Schema, Document } from "mongoose";

interface EmailVerification extends Document {
  user: Schema.Types.ObjectId;
  verificationCode: string;
  verified: boolean;
  expiresAt: Date;
  createdAt: Date;
}

const EmailVerificationSchema: Schema<EmailVerification> = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  verificationCode: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(+new Date() + 15 * 60 * 1000), // Définir une expiration par défaut à 15 minutes à partir de la création
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false, // Rendre éventuellement ce champ non sélectionnable dans les requêtes si vous ne voulez pas l'exposer
  },
});

export default mongoose.model<EmailVerification>(
  "EmailVerification",
  EmailVerificationSchema
);
