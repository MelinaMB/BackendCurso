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

// const Models = new UsersModels();

//  export class UserService {
//   validateUser(firstName, lastName, email) {
//     if (!firstName || !lastName || !email) {
//       console.log('validation error: please complete firstName, lastname and email.');
//       throw new Error('validation error: please complete firstName, lastname and email.');
//     }
//   }

//   async getAll() {
//     const usersList = await  Models.getAll();
//     return usersList;
//   }

//   // async getAll() {
//   //   const users = await UserModel.find({});
//   //   return users;
//   // }

//   async createOne(firstName, lastName, email, age) {
//     this.validateUser(firstName, lastName, email);
//     const userCreated = await UserModel.create({ firstName, lastName, email, age});
//     return userCreated;
//   }

//   async deletedOne(_id) {
//     const deleted = await UserModel.deleteOne({ _id: _id });
//     return deleted;
//   }

//   async updateOne(_id, firstName, lastName, email, age) {
//     if (!_id) throw new Error('invalid _id');
//     this.validateUser(firstName, lastName, email);
//     const userUptaded = await UserModel.updateOne({ _id: id }, { firstName, lastName, email, age });
//     return userUptaded;
//   }
// }
