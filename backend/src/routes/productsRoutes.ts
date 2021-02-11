import { Router } from "@awaitjs/express";
import { getProducts, getProduct } from "../controllers/products";

const router = Router();

router.getAsync("/", getProducts);
router.getAsync("/:id", getProduct);

export default router;
