import { Router } from "express";
import { addOrderItems } from "../controllers/orderController";

const router = Router();

router.post("/", addOrderItems);

export default router;
