const Blog = require('../models/blog')
const User = require('../models/user')

const initialUsers = [
  {
    _id: '5e13a6811c9d440000a3971e',
    blogs: [
      '5a422a851b54a676234d17f7'
    ],
    username: 'mchan',
    name: 'Michael Chan',
    passwordHash: '$2b$10$cwIdI7gz5SFE9/dy5F8OwepAk7RGUqV0M0ZqqThMzp/T2dum5v2Ku',
    __v: 0,
  },
  {
    _id: '5e139ae38fee97643345bd50',
    blogs: [
      '5a422aa71b54a676234d17f8',
      '5a422b3a1b54a676234d17f9'
    ],
    username: 'ewdijkstra',
    name: 'Edsger W. Dijkstra',
    passwordHash: '$2b$10$cwIdI7gz5SFE9/dy5F8OwepAk7RGUqV0M0ZqqThMzp/T2dum5v2Ku',
    __v: 0,
  },
  {
    _id: '5e1398bc2f763662e3164ebf',
    blogs: [
      '5a422b891b54a676234d17fa',
      '5a422ba71b54a676234d17fb',
      '5a422bc61b54a676234d17fc'
    ],
    username: 'unclebob',
    name: 'Robert C. Martin',
    passwordHash: '$2b$10$cwIdI7gz5SFE9/dy5F8OwepAk7RGUqV0M0ZqqThMzp/T2dum5v2Ku',
    __v: 0,
  }
]

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '5e13a6811c9d440000a3971e',
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: '5e139ae38fee97643345bd50',
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: '5e139ae38fee97643345bd50',
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    user: '5e1398bc2f763662e3164ebf',
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    user: '5e1398bc2f763662e3164ebf',
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: '5e1398bc2f763662e3164ebf',
    __v: 0
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialUsers,initialBlogs, nonExistingId, blogsInDb, usersInDb
}
