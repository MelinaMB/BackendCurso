import { UserModel } from '../models/users.model.js';

export class UsersModels {
  validateUser(firstName, lastName, email) {
    if (!firstName || !lastName || !email) {
      console.log('validation error: please complete firstName, lastname and email.');
      throw new Error('validation error: please complete firstName, lastname and email.');
    }
  }
  async getAll() {
    const users = await UserModel.find({});
    return users;
  }

  async createOne(firstName, lastName, email, age) {
    // this.validateUser(firstName, lastName, email);
    const userCreated = await UserModel.create({ firstName, lastName, email, age});
    return userCreated;
  }

  async deletedOne(_id) {
    const deleted = await UserModel.deleteOne({ _id: _id });
    return deleted;
  }

  async updateOne(_id, firstName, lastName, email, age) {
    if (!_id) throw new Error('invalid _id');
    this.validateUser(firstName, lastName, email);
    const userUptaded = await UserModel.updateOne({ _id: id }, { firstName, lastName, email, age });
    return userUptaded;
  }

  async getUserById(id) {
    const user = await UserModel.findOne({ _id: id });
    return user;
  };
}
