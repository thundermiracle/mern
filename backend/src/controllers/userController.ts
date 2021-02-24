import { Request, Response } from "express";
import { deleteTokenFromCookie, setTokenToCookie } from "../lib/tokenUtils";
import UserModel from "../models/UserModel";

interface ILoginUser {
  email?: string;
  password?: string;
}

interface IRegisterUser {
  name: string;
  email: string;
  password: string;
}

interface IUpdateUser {
  name: string;
  email: string;
  password?: string;
}

/**
 * @description User login
 * @route POST /api/users/login
 * @access public
 */
export const userLogin = async (request: Request<{}, {}, ILoginUser>, response: Response) => {
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
 * @description User logout
 * @route POST /api/users/logout
 * @access public
 */
export const userLogout = async (request: Request, response: Response) => {
  // delete token from cookie
  deleteTokenFromCookie(response);

  response.json({
    success: true,
    data: true,
  });
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

/**
 * @description Update User Profile
 * @route PUT /api/users/profile
 */
export const updUserProfile = async (request: Request<{}, {}, IUpdateUser>, response: Response) => {
  const user = await UserModel.findById(request.userId);
  if (!user) {
    response.status(404);
    throw new Error("User not found");
  }

  // apply
  user.name = request.body.name || user.name;
  user.email = request.body.email || user.email;
  if (request.body.password) {
    user.password = request.body.password;
  }

  await user.save();

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
    // set jwt to cookie to persist login status
    setTokenToCookie(user.id, response);

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
