import { Router } from "express";
import {
  myMessages,
  myMessage,
  deleteMessage,
  replyMessage,
} from "../controllers/messages.controller";
import { verifyUser } from "../middleware/auth.middleware";

export const messagesRouter: Router = Router();

messagesRouter.get("/", verifyUser, myMessages);
messagesRouter.get("/:id", verifyUser, myMessage);
messagesRouter.delete("/:id", verifyUser, deleteMessage);
messagesRouter.post("/:id/reply", verifyUser, replyMessage);
