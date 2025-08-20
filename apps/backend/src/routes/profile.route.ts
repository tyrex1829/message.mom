import { Router } from "express";
import { myProfile, updateMyProfile } from "../controllers/profile.controller";
import { verifyUser } from "../middleware/auth.middleware";

export const profileRouter: Router = Router();

profileRouter.get("/", verifyUser, myProfile);
profileRouter.patch("/", verifyUser, updateMyProfile);
