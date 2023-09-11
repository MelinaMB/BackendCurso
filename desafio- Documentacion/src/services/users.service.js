import { UsersModels } from '../DAO/classes/users.dao.js';

const Models = new UsersModels();

 class UserService {
  
  async getAll() {
    const usersList = await Models.getAll();
    return usersList;
  }

  async createOne() {
    const userCreated = await Models.createOne();
    return userCreated;
  }

  async deletedOne() {
    const deleted = await Models.deleteOne();
    return deleted;
  }

  async updateOne() {
    if (!_id) throw new Error('invalid _id');
    const userUptaded = await Models.updateOne();
    return userUptaded;
  }

  async getUserById(uid){
    const user = await Models.getUserById(uid);
    return user;
  }
}

export default UserService;
