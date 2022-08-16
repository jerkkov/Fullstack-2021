const mongoose = require ('mongoose')
const supertest = require ('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = require('../utils/sampleBlogs').blogs

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json and expected amount is returned', async () => {
    const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('id field is defined', async () => {
    const response = await api.get('/api/blogs')
    for (let i = 0; i < response.length; i++) {    
    expect(response._id[i]).toBeDefined()
    }
})

test('a valid blog can be added', async () => {
    const newBlog = {
        _id: "5a422b891b54a676234d34ds",
        title: "Second class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
        likes: 10
    }
    
    await api 
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.content)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(contents).toContain('Second class tests')
})

afterAll(() => {
    mongoose.connection.close()
})