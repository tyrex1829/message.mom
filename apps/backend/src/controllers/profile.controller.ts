import { prisma } from "@message-mom/db/prisma";
import { UpdateProfileSchema } from "@message-mom/zod";
import { Request, Response } from "express";

export const myProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        profile: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: "user_not_found" });
      return;
    }

    res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name,
      profile: user.profile,
    });
    return;
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateMyProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parse = UpdateProfileSchema.safeParse(req.body);
    if (!parse.success) {
      res.status(400).json({ error: parse.error.issues });
      return;
    }

    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { bio, avatarUrl, socials } = parse.data;

    const updatedProfile = await prisma.profile.update({
      where: {
        userId,
      },
      data: {
        bio: bio ?? undefined,
        avatarUrl: avatarUrl ?? undefined,
        socialsJson: socials ? JSON.stringify(socials) : undefined,
      },
    });

    res.status(200).json({
      success: true,
      profile: {
        bio: updatedProfile.bio,
        avatarUrl: updatedProfile.avatarUrl,
        socials: updatedProfile.socialsJson
          ? JSON.parse(String(updatedProfile.socialsJson))
          : {},
      },
    });
    return;
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Internal server error" });
  }
};
