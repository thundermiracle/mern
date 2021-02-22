import { Router } from "express";
import { userLogin, getUserProfile, registerUser, userLogout } from "../controllers/userController";

const router = Router();

router.post("/login", userLogin);
router.get("/profile", getUserProfile);
router.post("/", registerUser);
router.post("/logout", userLogout);

export default router;
