import { Router } from "express";
import { publicRouter } from "./public.route";
import { messagesRouter } from "./messages.route";
import { profileRouter } from "./profile.route";

export const indexRouter: Router = Router();

indexRouter.use("/public", publicRouter);
indexRouter.use("/messages", messagesRouter);
indexRouter.use("/profile", profileRouter);
