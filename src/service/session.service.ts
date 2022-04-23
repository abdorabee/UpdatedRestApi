import SessionModel ,{SchemaDocument,SessionDocument} from '../models/session.model';
import {FilterQuery,UpdateQuery} from 'mongoose';


export async function createSession(userId: string ,userAgent:string) {
 const session = await SessionModel.create({user: userId,userAgent});

 return session.toJSON();
}

export async function findSessions(query: FilterQuery<SchemaDocument>){
return SessionModel.find(query).lean();
}

export async function updateSession(
    query: FilterQuery<SessionDocument>,
    update: UpdateQuery<SessionDocument>
  ) {
    return SessionModel.updateOne(query, update);
  }
  