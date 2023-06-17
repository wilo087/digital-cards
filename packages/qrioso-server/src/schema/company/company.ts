import type { Resolvers, Company } from '@qrioso/types'

const companyResolver: Resolvers = {
  Query: {
    companies: async (_parent, _args, { db }): Promise<Company[]> => {
      const companies = await db.Company.findMany()

      return companies
    }
  },
  Company: {
    users: async (parent, _args, { db }): Promise<any> => {
      const users = await db.User.findMany({
        where: {
          companyId: parent.id
        }
      })

      return users
    }
  },
  Mutation: {
    createCompany: async (_parent, args, { db }): Promise<Company> => {
      const { input } = args
      const company = await db.Company.create({ data: input })

      return company
    }
  }
}

export default companyResolver
