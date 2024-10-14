const userExtractor = require ('../utils/middleware').userExtractor
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user');
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

// blogsRouter.put('/:id', async (request, response) => {
//   const {title, author, url, likes} = request.body 
//   const blog = await Blog.findByIdAndUpdate(
//     request.params.id,
//     {title, author, url, likes}, {new: true}
//   )
//   response.json(blog)
// })

blogsRouter.delete('/:id', userExtractor, async (request, response) => {

  const blogId = request.params.id
  const blog = await Blog.findById(blogId)
  const userId = request.user.id

  if (blog.user.toString() === userId.toString()) {
    await Blog.findByIdAndRemove(blogId)
    response.status(204).end()
  }
  else {
    return response.status(401).json({ error: 'user is not owner of the blog' })
  }
})

  module.exports = blogsRouter