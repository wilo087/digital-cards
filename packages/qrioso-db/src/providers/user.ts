import { createClient } from '@qrioso/db/src/client'
import bcryptjs from 'bcryptjs'
// import { User } from '@prisma/client'
// import { UserInput } from '@qrioso/types'

const client = createClient()

client.$use(async (params, next) => {
  const { action, model, args } = params

  if (model === 'User' && action === 'create') {
    args.data.password = await bcryptjs.hash(args.data.password, 10)
  }

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
// https://qrioso.auth.us-east-1.amazoncognito.com/oauth2/authorize?response_type=code&client_id=ri895uvf4jc59jnocqadqtrg3&redirect_uri=http://localhost:4000
export const provider = {
  ...client.user
}
