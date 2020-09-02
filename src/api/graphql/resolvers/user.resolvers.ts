import { AuthenticationError } from 'apollo-server';
import bcrypt from 'bcrypt';
import { User } from '@entity/User';
import { generateToken } from '@utils/jwt';

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
    },

    async signIn(_: void, args: { data: { username: string, password: string } }): Promise<{ token: string }> {

      const user = await User.
        findOne({ where: { username: args.data.username } })

      if (!user) {
        throw new AuthenticationError('Invalid Credentials');
      }

      const passwordMatch = await bcrypt.compare(args.data.password, user.password);

      if (!passwordMatch) {
        throw new AuthenticationError('Invalid Credentials');
      }

      return {
        token: generateToken(user.username)
      }

    }
  }
}