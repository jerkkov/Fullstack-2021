const { test, expect, beforeEach, describe, content } = require('@playwright/test')

const NAME = 'Ranka Tuhnu'
const USERNAME = 'RankTuhn'
const PASSWORD = 'salainen'

const mockBlog = {
  title: "Rankan uus blogi test",
  author: "Tyhnu töhn",
  url: "tuhnunsivu.fi",
  likes: "5"
}

const loginWith = async (page, username, password) => {
  await page.getByRole('button', { name: 'Login' }).click()
  await page.getByRole('textbox', { name: 'Username' }).fill(username)
  await page.getByRole('textbox', { name: 'Password' }).fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
} 

const createBlog = async (page) => {
  await page.getByRole('button', { name: 'New blog' }).click()

  await page.getByRole('textbox', { name: 'Title' }).fill(mockBlog.title)
  await page.getByRole('textbox', { name: 'Author' }).fill(mockBlog.author)
  await page.getByRole('textbox', { name: 'URL' }).fill(mockBlog.url)
  await page.getByLabel('Likes').fill(mockBlog.likes)
  
  await page.getByRole('button', { name: 'Create' }).click()
}

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: NAME,
        username: USERNAME,
        password: PASSWORD
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const heading = await page.getByRole('heading', { name: 'Login' })
    const usernameInput = await page.getByRole('textbox', { name: 'Username' })
    const passwordInput = await page.getByRole('textbox', { name: 'Password' })
    const submitButton = await page.getByRole('button', { name: 'Login' })
    
    await expect(heading, usernameInput, passwordInput, submitButton).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      loginWith(page, USERNAME, PASSWORD)
      await expect(page.getByText(`Welcome ${USERNAME}!`)).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'Login' }).click()
      await expect(page.getByText('Wrong credentials')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    
    beforeEach(async ({ page }) => {
     await loginWith(page, USERNAME, PASSWORD)
    })

    test('a new blog can be created', async ({ page }) => {
     await createBlog(page)
     await expect(page.getByText(mockBlog.title)).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'New blog' }).click()

      // await page.getByRole('textbox', { name: 'Title' }).fill(mockBlog.title)
      // await page.getByRole('textbox', { name: 'Author' }).fill(mockBlog.author)
      // await page.getByRole('textbox', { name: 'URL' }).fill(mockBlog.url)
      // await page.getByLabel('Likes').fill(mockBlog.likes)
      
      // await page.getByRole('button', { name: 'Create' }).click()
      // await expect(page.getByText(mockBlog.title)).toBeVisible()
    })
  })
})
