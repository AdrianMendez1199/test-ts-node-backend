import path from 'path';
import { mergeResolvers, mergeTypeDefs, loadFilesSync } from 'graphql-tools';

let ext = 'js';

if (process.env.NODE_ENV === 'test') {
  ext = 'ts';
}

const types = loadFilesSync(path.join(__dirname, '/**/*.graphql'));
const resolvePath = loadFilesSync(path.join(__dirname, `/resolvers/*.${ext}`));

// Export graphql file and resolvers
export const typeDefs = mergeTypeDefs(types);
export const resolvers = mergeResolvers(resolvePath);
