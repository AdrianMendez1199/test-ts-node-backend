import { ApolloServer } from 'apollo-server';
import { createConnection } from 'typeorm';
import 'reflect-metadata';
import 'dotenv/config';
import 'module-alias/register';
import { typeDefs, resolvers } from '@api/graphql';
import isAuthenticated from '@api/graphql/directives/Authentication';


// Db Connection on start server
(async (): Promise<void> => {
  try {
    await createConnection({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      synchronize: true,
      logging: process.env.NODE_ENV !== 'production',
      entities: [__dirname + '/entity/*.{ts,js}'],
      extra: { max: 10, min: 1 },
    })
  } catch (error) {
    process.exit(1);
  }
})();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: { isAuthenticated },
  context: (request): Record<string, unknown> => ({ request }),
});


server.listen().then(({ url }): void => {
  /* eslint-disable-next-line no-console */
  console.log(`Server runing on ${url}`);
})