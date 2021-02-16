import init from "./lib/init";
init();

import express from "express";
import productsRouter from "./routes/productsRoutes";
import usersRouter from "./routes/usersRoutes";
import env from "./config/environment";
import ErrorHandler from "./handlers/ErrorHandler";

const port = env.PORT;
const nodeEnv = env.NODE_ENV;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use(ErrorHandler);

app.listen(port, () => console.log(`[${nodeEnv}] Server running on ${port}`.green));
