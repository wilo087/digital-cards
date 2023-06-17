import path from 'path'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { makeExecutableSchema } from '@graphql-tools/schema'

const typesArray = loadFilesSync(path.join(__dirname, './**/*.gql'))
const resolvers = loadFilesSync(path.join(__dirname, './**/*.ts'))

export default makeExecutableSchema({
  typeDefs: mergeTypeDefs(typesArray),
  resolvers: mergeResolvers(resolvers)
})
