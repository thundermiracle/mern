import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export interface IUserModel extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  matchPassword: (enteredPassword: string) => boolean;
}

const userSchema = new mongoose.Schema<IUserModel>(
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

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const UserModel = mongoose.model<IUserModel>("User", userSchema);

export default UserModel;
