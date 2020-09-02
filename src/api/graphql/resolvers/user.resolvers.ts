import { User } from '@entity/User';

export default {
  Query: {},

  Mutation: {
    /**
     * create user
     * @param {void} _ 
     * @param {Object} args 
     * @property {User} args.data 
     * @property {string} args.data.username 
     * @property {string} args.data.firstname 
     * @property {string} args.data.lastname 
     * @property {string} args.data.password 
     * @returns {Promise<User>}
     */
    async createUser(_: void, args: { data: User }): Promise<User> {
      console.log(args.data);
      const user = User.create(args.data);
      await user.save();
      return user;
    }
  }
}