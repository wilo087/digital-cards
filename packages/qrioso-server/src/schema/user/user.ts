import type { User, Resolvers, AuthPayload } from '@qrioso/types'
import { GraphQLError } from 'graphql'
import jwt from 'jsonwebtoken'

const UserResolver: Resolvers = {
  Query: {
    me: async (_parent, _args, context): Promise<User> => {
      return context.currentUser
    },
    getUsers: async (_parent, _args, { db }): Promise<User[]> => {
      const users = await db.user.findMany()

      return users
    }
  },
  Mutation: {
    login: async (_parent, { email, password }, { db }): Promise<AuthPayload> => {
      // const user = await db.User.Login(email, password)
      const user = await db.User.findFirst({ where: { email, password } })

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
      const user = await db.User.findUnique({ where: { email: input.email } })
      console.log('test', user)

      if (user !== null) {
        throw new GraphQLError('User already exists', {
          extensions: { code: 'FORBIDDEN' }
        })
      }

      const createdUser = await db.User.create({ data: input })

      return { token: 'HHGBBBHHSLOUTNLSH', user: createdUser }
    }
  }
}

export default UserResolver
