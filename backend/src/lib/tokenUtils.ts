import jwt from "jsonwebtoken";
import { Response } from "express";
import env from "../config/environment";

export function generate(input: any): string {
  return jwt.sign(input, env.JWT_SECRET as jwt.Secret, { expiresIn: env.JWT_EXPIREDIN });
}

export function decode(bearerToken?: string) {
  if (!bearerToken || !bearerToken.startsWith("Bearer") || bearerToken.split(" ").length < 2) {
    return null;
  }

  const [, token] = bearerToken.split(" ");

  try {
    const result = jwt.verify(token, env.JWT_SECRET as jwt.Secret);
    if (result == null) {
      throw new Error("");
    }

    return result;
  } catch {
    return null;
  }
}

/**
 * decode token saved in cookie without 'Bearer'
 * @param token
 */
export function decodeCookieToken(token?: string) {
  if (!token) {
    return null;
  }

  try {
    const result = jwt.verify(token, env.JWT_SECRET as jwt.Secret);
    if (result == null) {
      throw new Error("");
    }

    return result;
  } catch {
    return null;
  }
}

/**
 *
 * generate userId's token and set it to cookie
 *
 * @param id
 * @param response
 */
export function setTokenToCookie(id: string, response: Response) {
  const token = generate({ id });
  response.cookie("token", token, {
    httpOnly: true,
    sameSite: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day cookie
  });
}
