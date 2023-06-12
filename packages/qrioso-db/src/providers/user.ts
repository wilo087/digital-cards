import { createClient } from '@qrioso/db/src/client'
import bcryptjs from 'bcryptjs'
// import { User } from '@prisma/client'
// import { UserInput } from '@qrioso/types'

const client = createClient()

client.$use(async (params, next) => {
  const { action, model, args } = params
  console.log('Before', params)

  if (model === 'User' && action === 'create') {
    args.data.password = await bcryptjs.hash(args.data.password, 10)
  }

  if (model === 'User' && action === 'findFirst' && args.where.password !== undefined) {
    console.log('Password ', args.where.password)
    args.where.password = await bcryptjs.hash(args.where.password, 10)
  }

  console.log('After on find first', params)
  return await next(params)
})

// const findOrCreate = async (data: UserInput): Promise<User> => {
//   const user = await client.user.findUnique({ where: { email: data.email } })

//   if (user !== null) {
//     return user
//   }

//   const userCreated = await client.user.create({ data })
//   return userCreated
// }

export const provider = {
  ...client.user
}
