import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders blog title and author', () => {
  const blog = {
    title: 'Render test title',
    author: 'Render test author'
  }

  render(<Blog blog={blog} />)
})

test('renders blog url, likes, and user when show button is clicked', async () => {
  const blog = {
    title: 'Render test title',
    author: 'Render test author',
    url:'Render test url',
    likes:4,
    username: 'Render test user'
  }
  screen.debug()

  render(<Blog blog={blog} />)
  const user = userEvent.setup()
  const button = screen.getByText('Show')
  await user.click(button)
  const url = screen.getByText('Render test url')
  const likes = screen.getByText(`likes:${blog.likes}`)
  const blogUser = screen.getByText(`Added by:${blog.user}`)
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
  expect(blogUser).toBeDefined()
})