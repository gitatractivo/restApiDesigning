import mongoose from 'mongoose';
import { UserDocument } from './user.model';

export interface SessionInput {
  user: UserDocument["_id"];
  valid: boolean;
  password: string;
  userAgent:string;
}

export interface SessionDocument extends SessionInput,mongoose.Document{
    createdAt:Date,
    updatedAt:Date,
}

const sessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
  valid: { type: Boolean, default: true },
  userAgent: { type: String, required: true },//tells from which browser this request was made
});


const SessionModel = mongoose.model<SessionDocument>('Session',sessionSchema)
export default SessionModel