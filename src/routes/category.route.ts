import { Router } from "express";
import { createCategory, listCategory, listProductsByCategory } from "../controllers/category.controller";


const router=Router()

router.route("/listCategories").get(listCategory)
router.route("/createCategory").post(createCategory)
router.route("/listCategories/:id").get(listProductsByCategory)
export default router