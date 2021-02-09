import mongoose from "mongoose";

export interface IUserModel extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.model<IUserModel>("User", userSchema);

export default UserModel;
