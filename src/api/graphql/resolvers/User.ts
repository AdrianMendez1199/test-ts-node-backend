import { User } from '@entity/User';

export default {
  Query: {},

  Mutation: {
    async createUser(_: void, args: { data: User }): Promise<User> {
      const user = new User();
      user.firstName = args.data.firstName;
      user.lastName = args.data.lastName;
      user.age = args.data.age;
      const response = await user.save();
      return response;
    }
  }
}