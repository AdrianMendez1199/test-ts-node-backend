import path from 'path';
import { mergeResolvers, mergeTypeDefs, loadFilesSync } from 'graphql-tools';

export const typeDefs = mergeTypeDefs( loadFilesSync(path.join(__dirname, '/**/*.graphql')));
export const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, `/resolvers/*.resolvers.*`)));
