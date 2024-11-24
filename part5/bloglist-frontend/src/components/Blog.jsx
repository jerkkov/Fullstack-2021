import { useState, useEffect } from 'react'

const Blog = ({ editBlog, blog }) => {

const [visible, setVisible] = useState(false)
const [blogPoster, setBlogPoster] = useState(false)

useEffect(() => {
  setBlogPoster(blog.user ? blog.user : "")
}, [])  

const addLike = () => {
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
      <td>{`likes:${blog.likes}`}</td><td><button onClick={addLike} type='submit'>Like</button></td>
    </tr>
    <tr>
      <td>{`Added by: ${blogPoster.username}`}</td>
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