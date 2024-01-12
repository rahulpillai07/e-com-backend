import { Router } from "express";
import { createProduct, listAllProducts } from "../controllers/product.controller";



const router=Router()

router.route("/listProducts").get(listAllProducts)
router.route("/createProduct").post(createProduct)
export default router