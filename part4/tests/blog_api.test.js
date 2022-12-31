const mongoose = require ('mongoose')
const supertest = require ('supertest')
const helper = require('../utils/sampleBlogs')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.blogs)
    }, 100000)

    test('blogs are returned as json and expected amount is returned', async () => {
        const response = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        expect(response.body).toHaveLength(helper.blogs.length)
    })

    test('id field is defined', async () => {
        const response = await api.get('/api/blogs')
        for (let i = 0; i < response.length; i++) {    
        expect(response._id[i]).toBeDefined()
        }
    })

    test('a valid blog can be added', async () => {
        const newBlog = {
            id: "5a422b891b54a676234d34ds",
            title: "Second class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
            likes: 10,
        }

        await api 
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const contents = response.body.map(r => r.title)

        expect(response.body).toHaveLength(helper.blogs.length + 1)
        expect(contents).toContain('Second class tests')
    })
})
afterAll(() => {
    mongoose.connection.close()
})
