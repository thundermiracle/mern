import { Router } from "express";
import { authUser } from "../controllers/user";

const router = Router();

router.post("/login", authUser);

export default router;
