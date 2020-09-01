import { AuthenticationError, SchemaDirectiveVisitor } from 'apollo-server';
import { defaultFieldResolver, GraphQLField } from 'graphql';
import { getToken } from '@utils/jwt';

export default class AuthDirective extends SchemaDirectiveVisitor {

  /**
   * 
   * @param {GraphQLField<CallableFunction, CallableFunction>} field 
   */
  public visitFieldDefinition(field: GraphQLField<CallableFunction, CallableFunction>):
    GraphQLField<CallableFunction, CallableFunction> | void {

    const originalResolve = field.resolve || defaultFieldResolver;
    /* eslint-disable @typescript-eslint/no-explicit-any */
    field.resolve = async function (...args: any): Promise<CallableFunction> {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      const context = args[2];

      if (!context.request.req.headers.authorization) {
        throw new AuthenticationError('Not authenticate');
      }

      // adding decode token to context
      context.request.auth = getToken(context.request.req.headers.authorization);

      return await originalResolve.apply(this, args);
    };
  }


}
