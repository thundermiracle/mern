import { NextFunction, Request, Response } from "express";
import isPublicUrl from "../lib/isPublicUrl";
import { decode } from "../lib/tokenUtils";
import UserModel from "../models/UserModel";

export default async function AuthHandler(req: Request, res: Response, next: NextFunction) {
  if (!isPublicUrl(req.url, req.method)) {
    const token = req.headers.authorization;
    const decodedToken = decode(token) as { id: string } | null;
    if (decodedToken == null) {
      res.status(401);
      throw new Error("Not authorized, Need token");
    }

    const loggedInUser = await UserModel.findById(decodedToken.id);
    if (loggedInUser == null) {
      res.status(401);
      throw new Error("Not authorized, user not exist");
    }

    req.user = {
      id: loggedInUser.id,
      name: loggedInUser.name,
      email: loggedInUser.email,
      isAdmin: loggedInUser.isAdmin,
    };
  }

  next();
}
