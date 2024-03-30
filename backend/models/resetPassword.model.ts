import { Schema, model, Document } from 'mongoose';

interface ResetPassword extends Document {
  Email: string;
  created_at: Date;
  expires_at: Date;
}

const ResetPasswordSchema = new Schema<ResetPassword>({
  Email: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  expires_at: { type: Date, default: () => new Date(Date.now() + 15 * 60 * 1000) }, // 15 minutes from now
});

const ResetPasswordModel = model<ResetPassword>('ResetPassword', ResetPasswordSchema);

export default ResetPasswordModel;
