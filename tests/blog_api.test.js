const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const request = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  const response = await request
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('blogs have id property', async () => {
  const response = await request
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  response.body.map(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('new blog post can be added', async () => {
  const newBlogPost = {
    'title': 'Test blog post',
    'author': helper.initialUsers[0].name,
    'url': 'http://localhost:3003/api/blogs',
    'likes': 1,
    'user': helper.initialUsers[0]._id,
  }
  await request
    .post('/api/blogs')
    .send(newBlogPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await request
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.length).toBe(helper.initialBlogs.length + 1)
  expect(response.body.map(blog => blog.title)).toContain(newBlogPost.title)
})

test('default value for likes is zero', async () => {
  const newBlogPost = {
    'title': 'Test blog post',
    'author': helper.initialUsers[0].name,
    'url': 'http://localhost:3003/api/blogs',
    'user': helper.initialUsers[0]._id,
  }
  const response = await request
    .post('/api/blogs')
    .send(newBlogPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toEqual(0)
})

test('title field is mandatory', async () => {
  const newBlogPost = {
    'author': helper.initialUsers[0].name,
    'url': 'http://localhost:3003/api/blogs',
    'user': helper.initialUsers[0]._id,
  }
  await request
    .post('/api/blogs')
    .send(newBlogPost)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('url field is mandatory', async () => {
  const newBlogPost = {
    'title': 'Test blog post',
    'author': 'Acme',
    'user': helper.initialUsers[0]._id,
  }
  await request
    .post('/api/blogs')
    .send(newBlogPost)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('remove a blog post', async () => {
  await request
    .delete(`/api/blogs/${helper.initialBlogs[0]._id}`)
    .expect(204)

  const response = await request
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.length).toBe(helper.initialBlogs.length - 1)
})

test('edit a blog post', async () => {
  const modifiedBlog = { ...helper.initialBlogs[0] }
  modifiedBlog.likes = 10
  await request
    .put(`/api/blogs/${modifiedBlog._id}`)
    .send(modifiedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await request
    .get(`/api/blogs/${modifiedBlog._id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.id).toEqual(helper.initialBlogs[0]._id)
  expect(response.body.likes).toEqual(10)
})

afterAll(async () => {
  mongoose.connection.close()
})
