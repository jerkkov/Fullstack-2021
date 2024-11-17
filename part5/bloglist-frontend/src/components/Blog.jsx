import { useState, } from 'react'

const Blog = ({ blog }) => {

const [visible, setVisible] = useState(false)
const togglableBlogInformation = () => (
  <>
    <tr>
      <td>{blog.url}</td>
    </tr>
    <tr>
      <td>{`likes:${blog.likes}`}</td><td><button>Like</button></td>
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