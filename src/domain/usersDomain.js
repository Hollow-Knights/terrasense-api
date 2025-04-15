import users from "../models/Users.js";

export class UsersDomain {
  static async createUser(userBody) {
    return users.create({
      name: userBody.name,
      email: userBody.email,
      password: userBody.password,
    });
  }

  static async findUserByEmail(email) {
    return await users.findOne({ email });
  }

  static async findUserById(id) {
    return await users.findBy({ id });
  }

  static async findAllUsers() {
    return await users.find();
  }

  static async deleteUserById(id) {
    return users.findByIdAndDelete(id);
  }
}
