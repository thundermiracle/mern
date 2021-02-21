import init from "./lib/init";
init();

import express from "express";
import cookieParser from "cookie-parser";
import "express-async-errors";
import env from "./config/environment";
import productsRouter from "./routes/productsRoutes";
import usersRouter from "./routes/usersRoutes";
import ErrorHandler from "./handlers/ErrorHandler";
import AuthHandler from "./handlers/AuthHandler";

const port = env.PORT;
const nodeEnv = env.NODE_ENV;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("*", AuthHandler);
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use(ErrorHandler);

app.listen(port, () => console.log(`[${nodeEnv}] Server running on ${port}`.green));
