import express from "express";
import router from "./routes";

const port = 5000;

const app = express();
app.use("/api", router);

app.listen(port, () => console.log(`Server running on ${port}`));
