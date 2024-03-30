import mongoose, { Schema, Document } from "mongoose";

export interface ExpiredSessionToken extends Document {
  jwtToken: string;
  createdAt: Date;
}

const ExpiredSessionTokenSchema: Schema = new Schema({
  jwtToken: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export default mongoose.model<ExpiredSessionToken>(
  "ExpiredSessionToken",
  ExpiredSessionTokenSchema
);
