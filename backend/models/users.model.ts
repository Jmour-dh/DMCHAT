import { Document, Schema, Model, model } from 'mongoose';

interface User extends Document {
  pseudo: string;
  email: string;
  password: string;
  profileImage?: string;
  firstName: string;
  lastName: string;
  sexe: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  messages: Schema.Types.ObjectId[];
  channels: Schema.Types.ObjectId[];
}



const UserSchema = new Schema<User>({
  pseudo: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String },
  firstName: String,
  lastName: String,
  sexe: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  channels: [{ type: Schema.Types.ObjectId, ref: 'Channel' }] 
  
});

const UserModel: Model<User> = model<User>('User', UserSchema);

export default UserModel;
