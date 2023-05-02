import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import schema from '@qrioso/server/src/schema'

const server = new ApolloServer({ schema })

startStandaloneServer(server, {
  listen: { port: 4000 }
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`)
}).catch(err => {
  console.error(err)
})
