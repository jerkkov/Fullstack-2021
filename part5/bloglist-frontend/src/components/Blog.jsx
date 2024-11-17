import { useState, useEffect } from 'react'

const Blog = ({ editBlog, blog }) => {

const [visible, setVisible] = useState(false)
const [blogPoster, setBlogPoster] = useState(false)

useEffect(() => {
  setBlogPoster(blog.user ? blog.user : "")
}, [])  

const addLike = (event) => {
  event.preventDefault()
  const updatedLikes = blog.likes + 1
  editBlog(blog.id,{
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: updatedLikes
  })
}

const togglableBlogInformation = () => (
  <>
    <tr>
      <td>{blog.url}</td>
    </tr>
    <tr>
      <td>{`likes:${blog.likes}`}</td><td><form onSubmit={addLike}><button type='submit'>Like</button></form></td>
    </tr>
    <tr>
      <td>{`Added by: ${blogPoster.username}`}</td>
    </tr>
  </>
)
  return (
  <div>
    <table>
      <thead>
        <tr>
          <td><div><span style={{fontWeight:'bold'}}>{blog.title}</span> {blog.author}</div></td><td><button onClick={() => setVisible(!visible)}>{visible ? "Hide" : "Show"}</button></td>
        </tr>
        {visible && togglableBlogInformation()}
      </thead>
    </table>
  </div>  
)
}

export default Blog