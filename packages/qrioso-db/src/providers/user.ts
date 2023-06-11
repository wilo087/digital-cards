import { createClient } from '@qrioso/db/src/client'
import { User } from '@prisma/client'
import { UserInput } from '@qrioso/types'
import bcryptjs from 'bcryptjs'

const client = createClient()

client.$use(async (params, next) => {
  const { action, model, args } = params

  if (model === 'User' && action === 'create') {
    args.data.password = await bcryptjs.hash(args.data.password, 10)
  }

  if (model === 'User' && action === 'findUnique') {
    args.where.password = await bcryptjs.hash(args.where.password, 10)
  }

  return await next(params)
})

const findOrCreate = async (data: UserInput): Promise<User> => {
  const user = await client.user.findUnique({ where: { email: data.email } })

  if (user !== null) {
    return user
  }

  const userCreated: User = await client.user.create({ data })
  return userCreated
}

export const provider = {
  ...client.user,
  findOrCreate
}
