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

afterAll(() => {
    mongoose.connection.close()
})