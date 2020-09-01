import { ApolloServer } from 'apollo-server';
import { createConnection } from 'typeorm';
import 'reflect-metadata';
import 'module-alias/register';
import 'dotenv/config';
import { typeDefs, resolvers } from '@api/graphql';
import AuthDirective from '@api/graphql/directives/Authentication';


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
      logging: false,
      entities: [__dirname + '/entity/*{.js,.ts}'],
      extra: { max: 10, min: 1 },
    })
  } catch (error) {
    process.exit(0);
  }
})();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: { AuthDirective },
});


server.listen().then(({ url }): void => {
  /* eslint-disable no-console */
  console.log(`Server runing on ${url}`);
  /* eslint-disable no-console */
})