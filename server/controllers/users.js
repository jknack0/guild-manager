const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const axios = require('axios')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const user = await User.findById(id)

  response.json(user)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  const saltRounds = 10
  const passwordHash = body.password ? await bcrypt.hash(body.password, saltRounds) : 0
  const realm = body.realm
  const characterName = body.characterName
  let rioResponse

  try {
    const URL = `https://raider.io/api/v1/characters/profile?region=us&realm=${realm}&name=${characterName}&fields=raid_progression%2Cmythic_plus_scores_by_season%3Acurrent`
    rioResponse = await axios.get(URL)
  } catch(exception) {
    return response.status(400).json({error: 'could note find character name or realm'})
  }
  

  if(!body.username || !body.password)
    return response.status(400).json({error: 'missing username or password'})
  if(body.username.length < 3 || body.password.length < 3)
    return response.status(400).json({error: 'username and password must be longer than 3 characters'})
  if(!realm)
    return response.status(400).json({error: 'missing realm'})
  if(!characterName)
    return response.status(400).json({error: 'missing charactername'})
  

  const newUser = new User({
    username: body.username,
    passwordHash: passwordHash,
    raiderIo: rioResponse.data
  })

  const savedUser = await newUser.save()
  response.json(savedUser)
})

module.exports = usersRouter