import { Router } from "express";
import {
  profile,
  messages,
  fetchRepliedMessages,
} from "../controllers/public.controller";
import { attachSubdomainUsername } from "../middleware/host.middleware";

export const publicRouter: Router = Router();

publicRouter.get("/profile", attachSubdomainUsername, profile);
publicRouter.post("/messages", attachSubdomainUsername, messages);
publicRouter.get("/messages", attachSubdomainUsername, fetchRepliedMessages);
