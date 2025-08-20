import { prisma } from "@message-mom/db/prisma";
import { ReplyMessageSchema } from "@message-mom/zod";
import { Request, Response } from "express";

export const myMessages = async (req: Request, res: Response) => {};

export const myMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    const { id } = req.params;

    const message = await prisma.message.findFirst({
      where: {
        id,
        ownerId: userId,
      },
    });

    if (!message) {
      res.status(404).json({ error: "not_found" });
      return;
    }

    res.status(200).json({
      id: message.id,
      body: message.body,
      createdAt: message.createdAt,
      replyBody: message.replyBody,
      repliedAt: message.repliedAt,
    });
    return;
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

export const deleteMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;

    const { id } = req.params;

    const message = await prisma.message.findFirst({
      where: {
        id,
        ownerId: userId,
      },
    });

    if (!message) {
      res.status(404).json({ error: "not_found" });
      return;
    }

    await prisma.message.delete({
      where: {
        id,
      },
    });

    res.status(200).json({ success: true });
    return;
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

export const replyMessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;

    const { id } = req.params;

    const parse = ReplyMessageSchema.safeParse(req.body);

    if (!parse.success) {
      res.status(400).json({ error: parse.error.issues });
      return;
    }

    const msg = await prisma.message.findFirst({
      where: { id, ownerId: userId },
    });

    if (!msg) {
      res.status(404).json({ error: "not_found" });
      return;
    }

    const updated = await prisma.message.update({
      where: { id },
      data: {
        replyBody: parse.data.body,
        repliedAt: new Date(),
      },
      select: {
        id: true,
        replyBody: true,
        repliedAt: true,
      },
    });

    res.status(200).json({
      ok: true,
      updated,
    });
    return;
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Internal server error" });
    return;
  }
};
