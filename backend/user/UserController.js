import UserService from './UserService.js';

class UserController {
  async create(req, res) {
    try {
      const user = await UserService.create(req.body);
      return res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async getAll(req, res) {
    try {
      const users = await UserService.getAll();
      return res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async getByUser(req, res) {
    try {
      const user = await UserService.getByUser(req.body);

      return res.json(
        user.password === req.body.password ? user : 'User not found'
      );
    } catch (error) {
      return res.json('User not found');
    }
  }
}

export default new UserController();
