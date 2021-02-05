import { Router } from "https://deno.land/x/oak/mod.ts";
import { getProducts, getProduct } from "./controllers/products.ts";

const router = new Router();

router.get("/api/products", getProducts).get("/api/products/:id", getProduct);

export default router;
