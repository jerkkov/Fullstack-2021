const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

// usersRouter.get('/:id', async (request, response) => {
//   const user = await User.findById(request.params.id)
//   if (user) {
//     response.json(user)
//   } else {
//     response.status(404).end()
//   }
// })

// usersRouter.put('/:id', async (request, response) => {
//   const {title, author, url, likes} = request.body 
//   const user = await User.findByIdAndUpdate(
//     request.params.id,
//     {title, author, url, likes}, {new: true}
//   )
//   response.json(user)
// })

// usersRouter.delete('/:id', async (request, response) => {
//   await User.findByIdAndRemove(request.params.id)
//   response.status(204).end()
// })


  module.exports = usersRouter