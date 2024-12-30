import { render, screen } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'
import userEvent from '@testing-library/user-event'

test('<NewBlogForm /> new blog is created with correct information', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<NewBlogForm createBlog={createBlog} />)
  const blog = {
    title: 'Render test title',
    author: 'Render test author',
    url:'Render test url',
    likes:'4',
    username: 'Render test user'
  }

  const submitButton = screen.getByText('Create')
  
  const titleInput = screen.getByLabelText("Title")
  const authorInput = screen.getByLabelText('Author')
  const urlInput = screen.getByLabelText('URL')
  const likesInput = screen.getByLabelText('Likes')

  await user.type(titleInput, blog.title )
  await user.type(authorInput, blog.author )
  await user.type(urlInput, blog.url )
  await user.type(likesInput, blog.likes )

  await user.click(submitButton)

  console.log(createBlog.mock.calls)
  expect(createBlog.mock.calls).toHaveLength(1)
  console.log(createBlog.mock.calls[0][0])
  console.log('title', createBlog.mock.calls[0][0].title)
  expect(createBlog.mock.calls[0][0].title).toBe(blog.title)
  expect(createBlog.mock.calls[0][0].author).toBe(blog.author)
  expect(createBlog.mock.calls[0][0].url).toBe(blog.url)
  expect(createBlog.mock.calls[0][0].likes).toBe(blog.likes)

})