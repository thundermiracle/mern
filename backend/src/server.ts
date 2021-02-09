import init from "./lib/init";
init();

import express from "express";
import router from "./controllers/routes";
import env from "./config/environment";

const port = env.PORT;
const nodeEnv = env.NODE_ENV;

const app = express();
app.use("/api", router);

app.listen(port, () => console.log(`[${nodeEnv}] Server running on ${port}`.green));
