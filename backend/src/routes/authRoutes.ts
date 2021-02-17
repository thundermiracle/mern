import Router from "express-promise-router";
import AuthHandler from "../handlers/AuthHandler";

const router = Router();

router.all("*", AuthHandler);

export default router;
