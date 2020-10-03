const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
require('dotenv').config()
let MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to ', MONGODB_URI)

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

let authors = [
  {
    name: 'Robert Martin',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963,
  },
  {
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821,
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
  },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 */

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime'],
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution'],
  },
]

const typeDefs = gql`
  type Book {
    title: String!
    author: Author
    published: Int!
    genres: [String]!
    id: ID!
  }
  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }
  type Mutation {
    addBook(
      title: String!
      author: String
      published: Int!
      genres: [String]!
    ): Book
    addAuthor(name: String!, born: Int): Author
    editAuthor(name: String!, setBornTo: Int!): Author
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      if (!args.author && !args.genre) {
        console.log('args.genre :>> ', args.genre)
        return books
      } else if (args.author) {
        return books.filter((obj) => obj.author === args.author)
      } else if (args.genre) {
        console.log('genre in if :>> ', args.genre)
        console.log('genre :>> ', args.genre)
        return books.filter((obj) => obj.genres.includes(args.genre))
      }
    },
    allAuthors: (root, args) => {
      return authors
    },
  },
  Author: {
    bookCount: (root, args) => {
      //   if (authors.filter((author) => author.name === args.name))

      const filter = books.filter((obj) => obj.author === root.name).length

      return filter
    },
  },
  Mutation: {
    addAuthor: (root, args) => {
      console.log('typeof args.born :>> ', typeof args.born)
      const author = new Author({ ...args })
      //   authors = authors.concat(author)
      console.log('typeof args.born :>> ', typeof args.born)
      return author.save()
    },
    addBook: (root, args) => {
      const book = new Book({ ...args })

      return book.save()
      //   if (authors.filter((author) => author.name === args.author).length < 1) {
      //     const author = { name: args.author, id: uuid() }
      //     console.log('author :>> ', author)
      //     authors = authors.concat(author)
      //     console.log('authors :>> ', authors)
      //   }
      //   const book = { ...args, id: uuid() }

      //   authors.filter((author) => author.name === args.author).length < 1,
      //     (books = [...books, book])

      //   return book
    },
    editAuthor: (root, args) => {
      const author = authors.find((p) => p.name === args.name)
      if (!author) {
        return null
      } else {
        const updatedAuthor = { ...author, born: args.setBornTo }
        authors = authors.map((p) => (p.name === args.name ? updatedAuthor : p))
        return updatedAuthor
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
