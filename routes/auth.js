import express from "express";
import { SignUp, SignIn } from "../controllers/auth.js";

const router = express.Router();

router.post("/sign-up", SignUp);
router.post("/sign-in", SignIn);

export default router;
