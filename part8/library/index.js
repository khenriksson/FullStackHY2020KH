const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'SECRET_KEY'

require('dotenv').config()
let MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to ', MONGODB_URI)
const DataLoader = require('dataloader')
const authorLoader = new DataLoader((keys) => batchAuthors(keys))

const batchAuthors = async (keys) => {
  console.log('keys :>> ', keys)
  const results = await Author.find({ id: { $in: keys } })
  return keys.map((key) => results[key] || new Error(`No result for ${key}`))

  console.log('results :>> ', results)
}

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

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book
    addAuthor(name: String!, born: Int): Author
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
  type Query {
    authorCount: Int!
    allBooks(genre: String, author: String): [Book!]!
    allAuthors: [Author!]!
    me: User
    filteredBooks(genre: String): [Book!]!
  }
  type Subscription {
    bookAdded: Book!
  }
`
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    // TODO: Count author's book
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] } })
      } else if (args.author) {
        const author = await Author.findOne({ name: args.author })
        const books = await Book.find({ author: author })
        return books
      } else if (args.genre && args.author) {
        const author = await Author.findOne({ name: args.author })
        const books = await Book.find({
          author: author,
          genres: { $in: [args.genre] },
        })
        return books
        return
      } else if (!args.genre && !args.author) {
        const books = await Book.find({})
        return books
      }
    },
    allAuthors: async (root, args) => {
      //   const author = await Author.find({})
      //   const books = await Book.find({})
      //   //   const bookLoad = await bookLoader.loadMany(books)
      //   //   console.log('bookLoad :>> ', bookLoad)
      //   return books
      //   return Author.find({})

      const authors = await Author.find({})
      const books = await Book.find({})

      const mapAuthors = authors.map((author) => {
        let step = 0
        books.forEach((book) => {
          if (String(book.author._id) === String(author._id)) step++
        })
        {
          author.bookCount = step
        }
        return author
      })

      return mapAuthors
    },
    me: (root, args, context) => {
      return context.currentUser
    },
  },

  Mutation: {
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    addBook: async (root, args, context) => {
      const author = await Author.findOne({ name: args.author })

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      let book

      if (!author) {
        const newAuthor = new Author({ name: args.author })
        try {
          await newwhaAuthor.save()
          book = new Book({ ...args, author: newAuthor })
          await book.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      } else {
        try {
          await author.save()

          book = new Book({ ...args, author: { ...author } })
          await book.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name })

      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      if (!author) {
        return null
      } else {
        author.born = args.setBornTo

        try {
          author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }

        return author
      }
    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secred') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
