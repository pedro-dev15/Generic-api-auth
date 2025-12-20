import { Router } from "express";
import * as user from "./auth.controller.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";

const router = Router();

//Routes
router.get("/", user.none);
router.post("/register", user.register);
router.post("/login", user.login);
router.get("/profile", authMiddleware, user.profile);

export default router;
