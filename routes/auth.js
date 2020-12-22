import express from "express";
import { SignUp, SignIn, GetRegisteredUser } from "../controllers/auth.js";
import Verification from "../routes/verify.js";

const router = express.Router();

router.get("/", Verification, GetRegisteredUser);
router.post("/sign-up", SignUp);
router.post("/sign-in", SignIn);

export default router;
