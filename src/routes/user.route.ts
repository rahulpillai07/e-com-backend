import { Router } from "express";
import { registerUser, userLogin } from "../controllers/user.controller";

const router=Router()

router.route("/login").post(userLogin)
router.route("/register").post(registerUser)
export default router