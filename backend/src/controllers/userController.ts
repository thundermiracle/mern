import { Request, Response } from "express";
import { setTokenToCookie } from "../lib/tokenUtils";
import UserModel from "../models/UserModel";

interface ILoginUser {
  email?: string;
  password?: string;
}

/**
 * @description User login
 * @route GET /api/users/login
 * @access public
 */
export const authUser = async (request: Request<{}, {}, ILoginUser>, response: Response) => {
  const { email, password } = request.body;

  if (email && password) {
    const user = await UserModel.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      // set jwt to cookie to persist login status
      setTokenToCookie(user.id, response);

      response.json({
        success: true,
        data: {
          _id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
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
  const user = await UserModel.findById(request.userId);
  if (!user) {
    response.status(404);
    throw new Error("User not found");
  }

  response.json({
    success: true,
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
  });
};

interface IRegisterUser {
  name: string;
  email: string;
  password: string;
}

/**
 * @description Register User
 * @route POST /api/users
 */
export const registerUser = async (request: Request<{}, {}, IRegisterUser>, response: Response) => {
  const { name, email, password } = request.body;

  const existedUser = await UserModel.findOne({ email });
  if (existedUser) {
    response.status(400);
    throw new Error("User already exists");
  }

  const user = await UserModel.create({
    name,
    email,
    password,
  });

  if (user) {
    response.status(201).json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } else {
    response.status(404);
    throw new Error("User not found");
  }
};
