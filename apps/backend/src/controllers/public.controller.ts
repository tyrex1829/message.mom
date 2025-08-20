import { prisma } from "@message-mom/db/prisma";
import { PublicMessageSchema } from "@message-mom/zod";
import { Request, Response } from "express";
import { randomToken, sha256 } from "../lib/crypto";

export const profile = async (req: Request, res: Response): Promise<void> => {
  try {
    const sub = req.subUsername;

    if (!sub) {
      res.status(400).json({
        exists: false,
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        username: sub,
      },
      include: {
        profile: true,
      },
    });

    if (!user) {
      res.status(400).json({
        exists: false,
      });
      return;
    }

    const profile = user.profile;

    res.status(200).json({
      exists: true,
      username: user.username,
      bio: profile?.bio ?? null,
      avatarUrl: profile?.avatarUrl ?? null,
      socials: profile?.socialsJson ?? {},
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const messages = async (req: Request, res: Response): Promise<void> => {
  try {
    const parse = PublicMessageSchema.safeParse(req.body);
    if (!parse.success) {
      res.status(400).json({ error: parse.error.issues });
      return;
    }

    const sub = req.subUsername;

    if (!sub) {
      res.status(404).json({ error: "user_not_found" });
      return;
    }

    const owner = await prisma.user.findUnique({
      where: {
        username: sub,
      },
    });

    if (!owner) {
      res.status(404).json({ error: "user_not_found" });
      return;
    }

    let viewToken = req.cookies.viewToken as string | undefined;

    if (!viewToken) {
      viewToken = randomToken();
      res.cookie("viewToken", viewToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 365 * 24 * 60 * 60 * 1000,
      });
    }

    const viewTokenHash = sha256(viewToken);

    const message = await prisma.message.create({
      data: {
        ownerId: owner.id,
        body: parse.data.body,
        viewTokenHash,
      },
    });

    res.status(201).json({
      messageId: message.id,
      success: true,
    });
    return;
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const fetchRepliedMessages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const sub = req.subUsername;

    if (!sub) {
      res.status(400).json({ error: "user_not_found" });
      return;
    }

    const owner = await prisma.user.findUnique({
      where: { username: sub },
    });

    if (!owner) {
      res.status(400).json({ error: "user_not_found" });
      return;
    }

    const viewToken = req.cookies.viewToken as string | undefined;

    if (!viewToken) {
      res.status(200).json({ messages: [] });
      return;
    }

    const viewTokenHash = sha256(viewToken);

    const messages = await prisma.message.findMany({
      where: {
        ownerId: owner.id,
        viewTokenHash,
        replyBody: { not: null },
      },
      orderBy: { createdAt: "asc" },
    });

    res.status(200).json({
      messages,
    });
    return;
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
};
