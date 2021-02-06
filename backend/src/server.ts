import express from "express";
import dotenv from "dotenv";
import router from "./routes";

dotenv.config();

const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV;

const app = express();
app.use("/api", router);

app.listen(port, () => console.log(`[${env}] Server running on ${port}`));
