import Blog from '../services/blogs'

const blogsInDb = async () => {
  const blogs = await Blog.getAll()
  return blogs
}

module.exports = {
  blogsInDb,
}
