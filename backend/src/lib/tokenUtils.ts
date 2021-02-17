import jwt from "jsonwebtoken";
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
