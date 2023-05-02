import { Profile, Resolvers } from '../generated'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'

const resolver: Resolvers = {
  Query: {
    getProfiles: async (): Promise<Profile[]> => {
      return [{
        id: '1',
        name: 'test',
        email: 'wilo0087@gmail.com',
        password: '1234',
        avatar: 'https://avatars.githubusercontent.com/u/10263699?v=4',
        role: 'ADMIN',
        createdAt: new Date().toString(),
        updatedAt: new Date().toString()
      }]
    }
  }
}

export default makeExecutableSchema({
  typeDefs: loadSchemaSync('./src/schema/profile/profile.graphql', {
    loaders: [new GraphQLFileLoader()]
  }),
  resolvers: resolver
})
