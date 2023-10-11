import User from './User.js';

class UserService {
  async create(user) {
    return await User.create(user);
  }

  async getAll() {
    return await User.find();
  }

  async getByUser(user) {
    return await User.findOne(user)
  }
}

export default new UserService();
