import SessionModel, {
  SchemaDocument,
  SessionDocument,
} from "../models/session.model";
import { FilterQuery, UpdateQuery } from "mongoose";
import {verifyJwt ,signJwt} from "../utils/jwt.utils";
import{get} from 'lodash';
import { findUser } from "./user.service";
import config from "config";


export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent });

  return session.toJSON();
}

export async function findSessions(query: FilterQuery<SchemaDocument>) {
  return SessionModel.find(query).lean();
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return SessionModel.updateOne(query, update);
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const {decoded} = verifyJwt(refreshToken)

  if(!decoded ||!get(decoded , '_id')) {
    return  false;
  }

  const session = await SessionModel.findById(get(decoded,"_id"));

  if(!session || !session.valid) {
     return false;
  }

  const user = await findUser({_id:session.user});

  if(!user) {
    return false;
  }

  // create  an access
  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes
  );
}

