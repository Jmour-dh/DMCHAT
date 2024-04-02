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
  verifiedEmailCode:boolean;
  createdAt: Date;
  updatedAt: Date;
  messages: Schema.Types.ObjectId[];
  channels: Schema.Types.ObjectId[];
}

// Définir une fonction de rappel pour définir le chemin par défaut de l'image de profil
const setDefaultProfileImage = () => {
  return '../assets/images/imageProfile.png';
};

const UserSchema = new Schema<User>({
  pseudo: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String, default: setDefaultProfileImage },
  firstName: String,
  lastName: String,
  sexe: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  verifiedEmailCode: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  channels: [{ type: Schema.Types.ObjectId, ref: 'Channel' }] 
  
});

const UserModel: Model<User> = model<User>('User', UserSchema);

export default UserModel;
