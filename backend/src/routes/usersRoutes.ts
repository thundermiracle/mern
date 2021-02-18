import { Router } from "express";
import { authUser, getUserProfile } from "../controllers/user";

const router = Router();

router.post("/login", authUser);
router.get("/profile", getUserProfile);

export default router;
