import mongoose from 'mongoose';

const Chat = new mongoose.Schema({
  timeStamp: { type: Date, required: false },
  content: { type: String, required: false },
  author: { type: String, required: false },
});

export default mongoose.model('Chat', Chat);
