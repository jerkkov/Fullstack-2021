import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ editBlog, deleteBlog, blog }) => {

  const [visible, setVisible] = useState(false)
  const [blogPoster, setBlogPoster] = useState(false)

  useEffect(() => {
    setBlogPoster(blog.user ? blog.user : '')
  }, [])

  const addLike = () => {
    const updatedLikes = blog.likes + 1
    editBlog(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: updatedLikes
    })
  }

  const confirmDelete = () => {
    window.confirm(`Do you really want to delete ${blog.title}`) ? deleteBlog(blog.id) : ''
  }

  const togglableBlogInformation = () => (
    <>
      <tr>
        <td>{blog.url}</td>
      </tr>
      <tr>
        <td>{`likes:${blog.likes}`}</td><td><button onClick={addLike} name='Like' type='submit'>Like</button></td>
      </tr>
      <tr>
        <td>{`Added by:${blogPoster.username}`}</td>
      </tr>
      <tr>
        <td>
          <button onClick={() => confirmDelete()} style={{ backgroundColor: 'transparent' }}>Delete</button>
        </td>
      </tr>
    </>
  )
  return (
    <div style={{ borderBottom: 'solid 1px grey', paddingBottom: 4 }}>
      <table>
        <thead>
          <tr>
            <td><div><span style={{ fontWeight: 'bold' }}>{blog.title}</span> {blog.author}</div></td><td><button name='toggleShow' onClick={() => setVisible(!visible)}>{visible ? 'Hide' : 'Show'}</button></td>
          </tr>
          {visible && togglableBlogInformation()}
        </thead>
      </table>
    </div>
  )
}

Blog.propTypes = {
  editBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
}

export default Blog