const express = require('express')
const app = express()
require('dotenv').config()
const Blog = require('./models/blog')

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }

app.use(express.json())

app.use(requestLogger)

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      if (blogs) {
        response.json(blogs)
      }
      else {
        response.status(404).end()
      }
      
    }).catch(error => console.log(error))
})

app.post('/api/blogs', (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})