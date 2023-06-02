import { createClient } from '@qrioso/db/src/client'
import { User } from '@prisma/client'
import { UserInput } from '@qrioso/types'
import bcryptjs from 'bcryptjs'

const client = createClient()

client.$use(async (params, next) => {
  if (params.model === 'User' && params.action === 'create') {
    const { data } = params.args
    data.password = await bcryptjs.hash(data.password, 10)
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
