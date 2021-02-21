import { Router } from "express";
import { authUser, getUserProfile, registerUser } from "../controllers/userController";

const router = Router();

router.post("/login", authUser);
router.get("/profile", getUserProfile);
router.post("/", registerUser);

export default router;
