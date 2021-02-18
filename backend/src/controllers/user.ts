import { Request, Response } from "express";
import { generate } from "../lib/tokenUtils";
import UserModel from "../models/UserModel";

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
      const token = generate({ id: user.id });

      response.json({
        success: true,
        data: {
          _id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token,
        },
      });
      return;
    }
  }

  response.status(401);
  throw new Error("Not Authorized");
};

/**
 * @description Get User Profile
 * @route GET /api/users/profile
 */
export const getUserProfile = async (request: Request, response: Response) => {
  const user = await UserModel.findById(request.user?.id);
  if (!user) {
    response.status(404);
    throw new Error("User not found");
  }

  response.json({
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
};
