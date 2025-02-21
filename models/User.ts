import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  profilePicSrc: string;
  lastSeenOn: Date;
  myServerUserId: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  profilePicSrc: String,
  lastSeenOn: { type: Date, default: Date.now },
  myServerUserId: { type: String, required: true, unique: true },
});

export default mongoose.model<IUser>('User', userSchema);
