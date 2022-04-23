import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import config from "config";
import { createSession } from "../service/session.service";
import { signJwt } from "../utils/jwt.utils";
import { findSessions } from "../service/session.service";
export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate the user's password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  // create a ssession
  const session = await createSession(user._id, req.get("user-agent") || "");

  // create  an access
  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes
  );

  // create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes
  );

  // return access & refresh token

  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user.id;

  const sessions = await findSessions({ user: userId, valid: false });

  return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
