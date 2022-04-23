import mongoose from "mongoose";
import {UserDocument} from './user.model';
export interface SchemaDocument extends mongoose.Document {
  user: UserDocument['_id'];
  valid: boolean;
  userAgent:String;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema(
  {
    user: { type:mongoose.Schema.Types.ObjectId, ref:'User'},
    valid: { type: Boolean, default: true },
    userAgent :{type:String}
  },
  {
    timestamps: true,
  }
);

export interface SessionDocument extends mongoose.Document {
  user: UserDocument["_id"];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}




const SessionModel = mongoose.model<SessionDocument>("Session", sessionSchema)

export default SessionModel;
