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
    async signUp(_: void, args: { data: User }): Promise<User> {
      const user = User.create(args.data);
      await user.save();
      return user;
    }
  }
}