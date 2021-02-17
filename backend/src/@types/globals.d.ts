/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly PORT?: string;
    readonly MONGO_URI: string;
    readonly JWT_SECRET: string;
    readonly JWT_EXPIREDIN?: string;
  }
}

declare namespace Express {
  interface LoggedInUser {
    name: string;
    email: string;
    isAdmin?: boolean;
  }
  interface Request {
    user?: LoggedInUser;
  }
}
