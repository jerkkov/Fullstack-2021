const mongoose = require ('mongoose')
const supertest = require ('supertest')
const helper = require('../utils/blogHelper')
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
        const newBlog = {...helper.blogs[0], title: 'New hit book'}
        await api 
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const contents = response.body.map(r => r.title)

        expect(response.body).toHaveLength(helper.blogs.length + 1)
        expect(contents).toContain('New hit book')

    })

    test('default value of likes is 0', async () => {
        const newBlog = {
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        }

        await api 
        .post('/api/blogs')
        .send(newBlog)

        const response = await api.get('/api/blogs')
        const addedBlog = response.body[response.body.length -1]
        expect(addedBlog).toBeDefined();
        expect(addedBlog.likes).toBe(0);
    })

    test('a blog without empty url and title is rejected', async () => {
        const newBlog = {
            author: "Edsger W. Dijkstra",
            likes: 3,
        }

        await api 
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })
})
afterAll(() => {
    mongoose.connection.close()
})
