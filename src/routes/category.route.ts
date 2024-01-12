import { Router } from "express";
import { createCategory, listCategory } from "../controllers/category.controller";


const router=Router()

router.route("/listCategories").get(listCategory)
router.route("/createCategory").post(createCategory)
export default router