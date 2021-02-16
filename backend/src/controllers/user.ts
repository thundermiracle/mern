import { Request, Response } from "express";
import UserModel, { IUserModel } from "../models/UserModel";

interface ILoginUser {
  email?: string;
  password?: string;
}

/**
 * @description User login
 * @route GET /api/users/login
 */
export const authUser = async (request: Request<{}, {}, ILoginUser>, response: Response) => {
  const { email, password } = request.body;

  if (email && password) {
    const user = await UserModel.findOne({ email });
    if (user && user.matchPassword(password)) {
      response.json({
        success: true,
        data: {
          _id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: null,
        },
      });
      return;
    }
  }

  response.status(401);
  throw new Error("Not Authorized");
};
