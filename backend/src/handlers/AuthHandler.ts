import { NextFunction, Request, Response } from "express";
import isPublicUrl from "../lib/isPublicUrl";
import { decodeCookieToken } from "../lib/tokenUtils";
import UserModel from "../models/UserModel";

export default async function AuthHandler(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (!isPublicUrl(request.url, request.method)) {
    // Get token from cookie instead of requests' headers
    const { token } = request.cookies;
    // const token = req.headers.authorization;

    const decodedToken = decodeCookieToken(token) as { id: string } | null;
    if (decodedToken == null) {
      response.status(401);
      throw new Error("Not authorized, Need token");
    }

    // push user basic info to request
    //
    request.userId = decodedToken.id;

    // TODO: save user info in session, no need to find user info in each request
    // const loggedInUser = await UserModel.findById(decodedToken.id);
    // if (loggedInUser == null) {
    //   response.status(401);
    //   throw new Error("Not authorized, user not exist");
    // }

    // request.user = {
    //   id: loggedInUser.id,
    //   name: loggedInUser.name,
    //   email: loggedInUser.email,
    //   isAdmin: loggedInUser.isAdmin,
    // };
  }

  next();
}
