import { AuthenticationError, SchemaDirectiveVisitor } from 'apollo-server';
import { defaultFieldResolver, GraphQLField } from 'graphql';
import { decodeToken } from '@utils/jwt';
import { User } from '@entity/User';

export default class AuthDirective extends SchemaDirectiveVisitor {

  /**
   * 
   * @param {GraphQLField<CallableFunction, CallableFunction>} field 
   */
  public visitFieldDefinition(field: GraphQLField<CallableFunction, CallableFunction>):
    GraphQLField<CallableFunction, CallableFunction> | void {

    const originalResolve = field.resolve || defaultFieldResolver;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    field.resolve = async function (...args: any): Promise<CallableFunction> {
      const context = args[2];

      if (!context.request.req.headers.authorization) {
        throw new AuthenticationError('Unauthenticated');
      }

      const info = decodeToken(context.request.req.headers.authorization);

      // TODO SAVe info in redis
      const userInfo = await User.findOne({ username: info.payload.username });
    
      if(!userInfo) {
        throw new AuthenticationError('Unauthenticated');
      }

      // removing password from user information
      const { password: _, ...rest } = userInfo;
      
      // adding user info to context
      context.request.auth = rest;



      return await originalResolve.apply(this, args);
    };
  }


}
