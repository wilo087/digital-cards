import { User, Resolvers, AuthPayload } from '@qrioso/types'
import { GraphQLError } from 'graphql'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { DateTimeResolver, DateTimeTypeDefinition } from 'graphql-scalars'
import jwt from 'jsonwebtoken'

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
      // const user = await db.User.Login(email, password)
      const user = await db.User.findUnique({ where: { email, password } })

      if (user === null) {
        throw new GraphQLError('Invalid user name or password', {
          extensions: { code: 'FORBIDDEN' }
        })
      }

      const token = jwt.sign({ userId: user.id }, 'CHANGE_ME_BY_ENV_VARIABLE')

      return {
        token,
        user: { password: undefined, ...user }
      }
    },
    signup: async (_parent, args, { db }): Promise<AuthPayload> => {
      const { input } = args
      const user = await db.User.findOrCreate(input)
      return { token: 'HHGBBBHHSLOUTNLSH', user }
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
