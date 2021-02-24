import { Router } from "express";
import {
  userLogin,
  getUserProfile,
  registerUser,
  userLogout,
  updUserProfile,
} from "../controllers/userController";

const router = Router();

router.post("/login", userLogin);
router.get("/profile", getUserProfile);
router.put("/profile", updUserProfile);
router.post("/", registerUser);
router.post("/logout", userLogout);

export default router;
