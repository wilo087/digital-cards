import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import schema from '@qrioso/server/src/schema'

// interface MyContext {
//   // we'd define the properties a user should have
//   // in a separate user interface (e.g., email, id, url, etc.)
//   user: UserInterface;
// }

const server = new ApolloServer({ schema })

startStandaloneServer(server, {
  listen: { port: 4000 }
  // context: {
  //   db
  // }
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`)
}).catch(err => {
  console.error(err)
})
