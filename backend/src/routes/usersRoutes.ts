import { Router } from "@awaitjs/express";
import { authUser } from "../controllers/user";

const router = Router();

router.postAsync("/login", authUser);

export default router;
