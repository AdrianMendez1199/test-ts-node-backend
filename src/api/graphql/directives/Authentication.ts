import { AuthenticationError, SchemaDirectiveVisitor } from 'apollo-server';
import { defaultFieldResolver, GraphQLField } from 'graphql';
import { decodeToken } from '@utils/jwt';

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

      // adding decode token to context
      context.request.auth = info.payload.username;

      return await originalResolve.apply(this, args);
    };
  }


}
