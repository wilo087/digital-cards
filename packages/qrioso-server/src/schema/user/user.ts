import { User, Resolvers, AuthPayload } from '@qrioso/types'
import { GraphQLError } from 'graphql'
import bcrypt from 'bcrypt'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { DateTimeResolver, DateTimeTypeDefinition } from 'graphql-scalars'

const resolver: Resolvers = {
  Query: {
    me: async (_parent, _args, context): Promise<User> => {
      return context.currentUser
    },
    getUsers: async (_parent, args, contextValue): Promise<User[]> => {
      const { db } = contextValue
      const users = await db.user.findMany()

      return users
    }
  },
  Mutation: {
    login: async (_parent, { email, password }, { db }): Promise<AuthPayload> => {
      const user = await db.User.findUnique({ where: { email } })

      if (user === null) {
        throw new GraphQLError('The user does not exist', {
          extensions: { code: 'FORBIDDEN' }
        })
      }

      // GHHDHHHJSHJFHJGHCIUHFIUGHBNBNJFHJSBF
      const validPassword = await bcrypt.compare(password, user.password)
      if (validPassword !== true) {
        throw new GraphQLError('Invalid user or password', {
          extensions: { code: 'FORBIDDEN' }
        })
      }

      // TODO: If everything is correct, generate the token
      // Logic to check if user exists with provided email
      const token = 'TEST_TOKEN'

      return {
        token,
        user
      }
    },
    signup: async (_parent, args, { db }): Promise<AuthPayload> => {
      const { input } = args
      const user = await db.User.findOrCreate(input)
      return { token: 'HHGBBBHHSLOUTNLSH', user }
      // return {
      //   token: 'HHGBBBHHSLOUTNLSH',
      //   user: {

      //     firstName: 'test',
      //     lastName: 'test',
      //     email: 'wilo0087@gmail.com',
      //     picture: '',
      //     role: '',
      //     createdAt: new Date(),
      //     updatedAt: new Date()
      //   }
      // }
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
