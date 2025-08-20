import { NextFunction, Request, Response } from "express";

const ROOT_SUBS = new Set(["message", "www", "api", "localhost"]);

export const attachSubdomainUsername = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const host =
    (req.headers["x-forwarded-host"] as string) || req.hostname || "";

  const sub = host.split(".")[0]?.toLowerCase() ?? "";

  req.hostValue = host;

  req.subUsername = sub && !ROOT_SUBS.has(sub) ? sub : null;

  next();
};
