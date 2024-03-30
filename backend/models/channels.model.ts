import { Document, Schema, Model, model } from 'mongoose';

interface Channel extends Document {
 channelName:string,
  createdAt: Date;
  updatedAt: Date;
}

const ChannelSchema = new Schema<Channel>({
  channelName: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const ChannelModel: Model<Channel> = model<Channel>('Channel', ChannelSchema);

export default ChannelModel;