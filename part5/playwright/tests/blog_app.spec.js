const { test, expect, beforeEach, describe, content } = require('@playwright/test')

const NAME = 'Ranka Tuhnu'
const USERNAME = 'RankTuhn'
const PASSWORD = 'salainen'

const mockBlog = {
  title: "blog1",
  author: "blogger",
  url: "blogger.fi",
  likes: "0"
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
     await createBlog(page)
    })

    test('a new blog can be created', async ({ page }) => {
     await expect(page.getByText(mockBlog.title)).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await expect(page.getByText(mockBlog.title)).toBeVisible()
      const blogElement = page.locator('table', { hasText: `${mockBlog.title} ${mockBlog.author}Show` })
      const showButton = blogElement.getByRole('button', { name: 'Show' })
      await showButton.click()
      await expect(page.getByText(`likes:${mockBlog.likes}`)).toBeVisible()
      await page.getByRole('button', { name: 'Like' }).click()
      const likesIncrementByOne = Number(mockBlog.likes + 1)
      await expect(page.getByText(`likes:${likesIncrementByOne.toString()}`)).toBeVisible()
    })
    test('a blog can be deleted', async ({ page }) => {
      await expect(page.getByText(mockBlog.title)).toBeVisible()
      const blogElement = page.locator('table', { hasText: `${mockBlog.title} ${mockBlog.author}Show` })
      const showButton = blogElement.getByRole('button', { name: 'Show' })
      await showButton.click()
      await page.getByRole('button', { name: 'Delete' }).click()
      page.on('dialog', dialog => dialog.accept());
      await page.waitForTimeout(2000) 
      expect(page.getByText('Blog deleted')).toBeDefined()

    })
  })
})
