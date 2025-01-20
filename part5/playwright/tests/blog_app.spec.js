const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
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