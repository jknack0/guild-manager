const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

describe('User api tests', () => {
  beforeEach(async () => {
    await User.deleteMany()
    const passwordHash = await bcrypt.hash('test', 10)
    const user = new User({username: 'test', passwordHash, characterName: 'thejuan', realm: 'Emerald Dream'})
    await user.save()
  })

  test('A new unique user can be added', async () => {
    const usersAtBeggining = await User.find({})
    expect(usersAtBeggining).toHaveLength(1)

    const newUser = {
      username: 'jknack0',
      password: 'Alphabet1',
      characterName: 'jonaye',
      realm:'Zul\'jin'
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtBeggining.length + 1)
  })

  test('A non unique user won\'t be added and respond with 400', async () => {
    const usersAtBeggining = await User.find({})
    const newUser = {
      username: 'test',
      password: 'burrito',
      characterName: 'jonboystamos',
      realm: 'Emerald Dream'
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtBeggining.length)
  })

  test('If the username is missing the response will be 400 and won\'t be added', async () => {
    const usersAtBeggining = await User.find({})
    const newUser = {
      password: 'burrito'
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtBeggining.length)
  })

  test('If the password is missing the response will be 400 and won\'t be added', async () => {
    const usersAtBeggining = await User.find({})
    const newUser = {
      username: 'ramona'
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(usersAtBeggining.length)
  })

  test('A single user can be retrieved with the user id', async () => {
    const usersAtBeggining = await User.find({})
    const user = usersAtBeggining[0].toJSON()

    const response = await api.get(`/api/users/${user.id}`)
    const retrievedUser = response.body
    expect(retrievedUser).toEqual(user)
  })

  test('When a mal formatted id is used the server responsed with the correct error message', async () => {
    const response = await api.get('/api/users/1')
    expect(response.error.text).toContain('malformatted id')
    expect(response.status).toBe(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
