import { Router } from "express";
import { addToCart } from "../controllers/cart.controller";

const router=Router()

router.route("/addToCart").post(addToCart)
export default router