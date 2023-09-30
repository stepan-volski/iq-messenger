import Chat from "./Chat.js";

class ChatService {
    async create(message) {
      return await Chat.create(message);
    }
  
    async getAll() {
      return await Chat.find();
    }
  
    async getOne(id) {
      if (!id) {
        throw new Error('id is not provided!');
      }
      return await Chat.findById(id);
    }
  
    async delete(id) {
      if (!id) {
        throw new Error('id is not provided!');
      }
      return await Chat.findByIdAndDelete(id);
    }
  
    async update(message) {
      if (!message._id) {
        res.status(400).json({ message: `[${message._id}] id is not found!` });
      }
      return await Chat.findByIdAndUpdate(message._id, message, {
        new: true,
      });
    }
  }
  
  export default new ChatService();