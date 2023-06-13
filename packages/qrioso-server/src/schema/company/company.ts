import type { Resolvers, Company } from '@qrioso/types'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { DateTimeResolver, DateTimeTypeDefinition } from 'graphql-scalars'

const resolver: Resolvers = {
  Query: {
    companies: async (_parent, _args, { db }): Promise<Company[]> => {
      const companies = await db.Company.findMany()

      return companies
    }
  },
  Mutation: {
    createCompany: async (_parent, args, { db }): Promise<Company> => {
      const { input } = args
      console.log('input', input)
      const company = await db.Company.create({ data: input })

      return company
    }
  }
}

export default makeExecutableSchema({
  typeDefs: [
    DateTimeTypeDefinition,
    loadSchemaSync('./src/schema/company/company.gql', { loaders: [new GraphQLFileLoader()] })
  ],
  resolvers: { ...resolver, DateTime: DateTimeResolver }
})
