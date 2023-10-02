import ChatService from './ChatService.js';

class ChatController {
  async create(req, res) {
    try {
      const message = await ChatService.create(req.body);
      return res.json(message);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async getAll(req, res) {
    try {
      const messages = await ChatService.getAll();
      return res.json(messages);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const message = await ChatService.getOne(id);

      return res.json(message);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const updatedMessage = await ChatService.delete(id);

      return res.json(updatedMessage);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async update(req, res) {
    try {
      const updatedMessage = await ChatService.update(req.body);

      return res.json(updatedMessage);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}

export default new ChatController();