import { createClient } from '@qrioso/db/src/client'
import bcryptjs from 'bcryptjs'
import { User } from '../../../qrioso-types/src'

const client = createClient()

client.$use(async (params, next) => {
  if (params.model === 'User' && params.action === 'create') {
    const user = params.args.data
    const encryptedPassword = await bcryptjs.hash(user.password, 10)
    user.password = encryptedPassword
  }

  return await next(params)
})

const findOrCreate = async (email: string, password: string): Promise<User> => {
  const user = await client.user.findUnique({ where: { email } })

  if (user !== null) {
    delete user.password
    return { ...user } as User
  }

  // const userCreated = await client.user.create({
  //   data: { email, password }
  // })

  const newUser = {
    // email: userCreated.email,
    email: 'userCreated.email',
    password
  }

  return newUser
}

export const provider = {
  ...client.user,
  findOrCreate
}
