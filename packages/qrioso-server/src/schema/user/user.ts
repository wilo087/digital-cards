import { User, Resolvers, AuthPayload } from '../generated'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { DateTimeResolver, DateTimeTypeDefinition } from 'graphql-scalars'

const resolver: Resolvers = {
  Query: {
    me: async (_parent, _args, context): Promise<User> => {
      return context.currentUser
    },
    getUsers: async (): Promise<User[]> => {
      return [{
        id: '1',
        firstName: 'test',
        lastName: 'test',
        email: 'wilo0087@gmail.com',
        password: '1234',
        picture: 'https://avatars.githubusercontent.com/u/10263699?v=4',
        role: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date()
      }]
    }
  },
  Mutation: {
    login: async (_parent, args, { models, secret }): Promise<AuthPayload> => {
      const { email, password } = args
      // const user = await models.User.findOne({ where: { email } })

      // Logic to check if user exists with provided email
      const token = '1234'

      return { token, user: { id: '1', firstName: 'test', lastName: 'test', email, password, picture: '', role: '', createdAt: new Date(), updatedAt: new Date() } }
    }
  }
}

export default makeExecutableSchema({
  typeDefs: [
    DateTimeTypeDefinition,
    loadSchemaSync('./src/schema/user/user.gql', { loaders: [new GraphQLFileLoader()] })
  ],
  resolvers: { ...resolver, DateTime: DateTimeResolver }
})
