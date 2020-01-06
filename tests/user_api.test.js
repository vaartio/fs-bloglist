const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const User = require('../models/user')

const request = supertest(app)

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'root', password: 'sekret' })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'jbond',
      name: 'James Bond',
      password: 'salainen007',
    }

    await request
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with a username already used', async () => {
    const newUser = {
      username: 'root',
      name: 'Bloody Roots',
      password: 'secret',
    }

    const response = await request
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toBe('User validation failed: username: Error, expected `username` to be unique. Value: `root`')
  })

  test('creation fails if password too short', async () => {
    const newUser = {
      username: 'jbond',
      name: 'James Bond',
      password: 'sa',
    }

    const response = await request
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toBe('Password length must be 3 characters at least')
  })
})

afterAll(async () => {
  mongoose.connection.close()
})
