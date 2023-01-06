const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
    Blog.find({}).then(blogs => {
      response.json(blogs)
    })
    .catch(error => next(error))
  })
  
  blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
  
    const blog = new Blog({
      _id: body._id,
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    })
  
    await blog.save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(error => next(error))
  })

  blogsRouter.delete('/:id', async (request, response) => {
    await Note.findByIdAndRemove(request.params.id)
    response.status(204).end()
  })


  module.exports = blogsRouter