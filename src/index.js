const { ApolloServer } = require('apollo-server')
const fs =  require('fs')
const path = require('path')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()




let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

// 1
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: async (parent, args, context) => {
      return context.prisma.link.findMany()
    },
  },
  Mutation: {
    // 2
    post: (parent, args, context) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        },
      })
      return newLink
    },  
  }
}


const Server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, './Schema/schema.graphql'), 'utf-8'),
    resolvers,
    context: {
      prisma,
    }
})


Server.listen().then(({ url }) => 
    console.log(`server is running on ${url}`)
);