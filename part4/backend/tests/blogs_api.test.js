const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
// const { usersInDb } = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    console.log('entering tests')
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('the first blog is correct title', async () => {
    const response = await api.get('/api/blogs')
    const blogsAtEnd = await helper.blogsInDb()

    const titles = blogsAtEnd.map((r) => r.title)
    expect(response.body[0].title).toBe(titles[0])
  })
})

describe('viewing a specific blog', () => {
  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api.get(`/api/blogs/${validNonexistingId}`).expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api.get(`/api/blogs/${invalidId}`).expect(400)
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const usersAtStart = await helper.usersInDb()

    // const user = usersAtStart[0]
    const loginUser = {
      username: usersAtStart[0].username,
      password: 'sekret',
    }

    const result = await api
      .post('/api/login')
      .send(loginUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = result.body.token

    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Kasper Henriksson',
      url: 'Testing 2',
      likes: 11,
      userId: usersAtStart[0].id,
    }

    await api
      .post('/api/blogs/')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    const titles = blogsAtEnd.map((r) => r.title)

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('async/await simplifies making async calls')
  })

  test('succeeds with likes defaulting to 0', async () => {
    const usersAtStart = await helper.usersInDb()
    const user = usersAtStart[0]

    const loginUser = {
      username: usersAtStart[0].username,
      password: 'sekret',
    }

    const result = await api
      .post('/api/login')
      .send(loginUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = result.body.token

    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Kasper Henriksson',
      url: 'Testing 2',
      userId: user.id,
    }

    await api
      .post('/api/blogs/')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    const likes = blogsAtEnd.map((r) => r.likes)

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(likes[helper.initialBlogs.length]).toEqual(0)
  })

  test('fails with status code 400 if data invaild', async () => {
    const usersAtStart = await helper.usersInDb()
    const user = usersAtStart[0]

    const loginUser = {
      username: usersAtStart[0].username,
      password: 'sekret',
    }
    const result = await api
      .post('/api/login')
      .send(loginUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = result.body.token

    const newBlog = {
      author: 'Kasper Henriksson',
      likes: 11,
      userId: user.id,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })

  test('fails with status code 401 if token is invaild', async () => {
    const usersAtStart = await helper.usersInDb()
    const user = usersAtStart[0]

    const token = 'somethingwrong'

    const newBlog = {
      author: 'Kasper Henriksson',
      likes: 11,
      userId: user.id,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })
})

describe('altering of a blog', () => {
  const changeBlog = {
    title: 'Great blog',
    author: 'Kasper Henriksson',
    url: 'Testing,',
    likes: 14,
  }

  test('succeeds if id exists', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const existingId = blogsAtStart[0].id

    await api.put(`/api/blogs/${existingId}`).send(changeBlog).expect(200)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    // const usersAtStart = await helper.usersInDb()
    // const user = usersAtStart[0]

    // const loginUser = {
    //   username: usersAtStart[0].username,
    //   password: 'sekret',
    // }
    // const result = await api
    //   .post('/api/login')
    //   .send(loginUser)
    //   .expect(200)
    //   .expect('Content-Type', /application\/json/)

    // const token = result.body.token
    const invalidId = '5a3d5da59070081a82a3445'

    await api.put(`/api/blogs/${invalidId}`).send(changeBlog).expect(400)
  })
})

describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const usersAtStart = await helper.usersInDb()

    // const user = usersAtStart[0]
    const loginUser = {
      username: usersAtStart[0].username,
      password: 'sekret',
    }

    const result = await api
      .post('/api/login')
      .send(loginUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = result.body.token

    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Kasper Henriksson',
      url: 'Testing 2',
      likes: 11,
      userId: usersAtStart[0].id,
    }

    const response = await api
      .post('/api/blogs/')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogToDelete = response.body.id

    await api
      .delete(`/api/blogs/${blogToDelete}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd.map((r) => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

test('the _id is named id', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogIdToView = blogsAtStart[0].id

  expect(blogIdToView).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})
