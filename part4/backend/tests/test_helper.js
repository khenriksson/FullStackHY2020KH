const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Great blog',
    author: 'Kasper Henriksson',
    url: 'Testing,',
    likes: 4,
  },
  {
    title: 'This is also Great',
    author: 'Jörgen Henriksson',
    url: 'No idea',
    likes: 2,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'async/await simplifies making async calls',
    author: 'Kasper Henriksson',
    url: 'Testing 2',
    likes: 11,
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}
