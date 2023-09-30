import mongoose from 'mongoose';

const Chat = new mongoose.Schema({
  timeStamp: { type: Date, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
});

export default mongoose.model('Chat', Chat);
