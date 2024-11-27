import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders blog title and author', () => {
  const blog = {
    title: 'Render test title',
    author: 'Render test author'
  }

  render(<Blog blog={blog} />)
})