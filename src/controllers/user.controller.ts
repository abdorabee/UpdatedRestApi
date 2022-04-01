import {Request , Response} from 'express';
import logger from '../utils/logger';
import {createUser} from '../service/user.service';
import { CreateUserInput } from "../schema/user.schema";

export async function createUserHandler(req:Request<{},{},CreateUserInput['body']>, res:Response){
try {
const user = await createUser(req.body);
return user; 
}
catch(e:any){
 logger.error(e);
 return res.status(409).send(e.message);
}
}