const { test, expect, beforeEach, describe } = require('@playwright/test')
const NAME = 'Ranka Tuhnu'
const USERNAME = 'RankTuhn'
const PASSWORD = 'salainen'
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
    const usernameInput = await page.getByRole('input', { name: 'Username' })
    const passwordInput = await page.getByRole('input', { name: 'Password' })
    const submitButton = await page.getByRole('button', { name: 'Login' })
    
    await expect(heading, usernameInput, passwordInput, submitButton).toBeVisible()
  })
})

describe('Login', () => {
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

  test('succeeds with correct credentials', async ({ page }) => {
    await page.goto('http://localhost:5173')

    await page.getByRole('textbox', { name: 'Username' }).fill(USERNAME)
    await page.getByRole('textbox', { name: 'Password' }).fill(PASSWORD)
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.getByText(`Welcome ${USERNAME}!`)).toBeVisible()
  })

  test('fails with wrong credentials', async ({ page }) => {
    await page.goto('http://localhost:5173')
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page.getByText('Wrong credentials')).toBeVisible()
  })
})