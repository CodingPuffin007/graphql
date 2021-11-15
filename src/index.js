const { ApolloServer } = require('apollo-server')
const fs =  require('fs')
const path = require('path')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const { getUserId } = require('./utils')




let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

// 1
const resolvers = {
  Query,
  Mutation,
  User,
  Link
}


const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, './Schema/schema.graphql'),
    'utf8'
  ),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      userId:
        req && req.headers.authorization
          ? getUserId(req)
          : null
    };
  }
 
});


server.listen().then(({ url }) => 
    console.log(`server is running on ${url}`)
);