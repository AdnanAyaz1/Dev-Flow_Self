import { Schema, model, models, Document } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  bio?: string;
  image?: string;
  location?: string;
  portfolio?: string;
  reputation?: number;
  provider: string; // Store the provider (e.g., 'github', 'google', 'credentials')
  providerAccountId: string; // Store the unique provider account ID
  password?: string; // For credentials-based login, if password is needed
}

export interface IUserDoc extends IUser, Document {}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    bio: { type: String },
    image: { type: String },
    location: { type: String },
    portfolio: { type: String },
    reputation: { type: Number, default: 0 },
    provider: { type: String, required: true }, // Store provider type
    providerAccountId: { type: String }, // Unique ID for the provider account
    password: { type: String }, // For credentials login only
  },
  { timestamps: true }
);

const User = models?.User || model<IUser>("User", UserSchema);

export default User;
