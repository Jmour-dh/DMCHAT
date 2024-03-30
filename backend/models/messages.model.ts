import { Document, Schema, model, Types } from 'mongoose';

interface Message extends Document {
  channelId: Types.ObjectId;
  userId: Types.ObjectId;
  userName: string;
  content: string;
  createdAt: Date;
}

const messageSchema = new Schema<Message>({
  channelId: {
    type: Schema.Types.ObjectId,
    ref: 'Channel',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const MessageModel = model<Message>('Message', messageSchema);

export default MessageModel;
