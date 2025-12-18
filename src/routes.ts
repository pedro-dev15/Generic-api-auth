import { Router } from "express";
import * as user from "./controller.ts";

const router = Router();

//Routes
router.get("/", user.none);
router.post("/register", user.register);
router.post("/login", user.login);

export default router;
