import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({})

  const [title, setTitle] = useState(null)
  const [author, setAuthor] = useState(null)
  const [url, setUrl] = useState(null)
  const [likes, setLikes] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])  
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }  
  }, [])

  const handleLogin  = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
    })
    window.localStorage.setItem(
      'loggedBlogAppUser', JSON.stringify(user)
    )
      blogService.setToken(user.token)
      setUser(user)
      console.log("user", user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification({type:'error', message:'Wrong credentials'})
      setTimeout(() => {
        setNotification({type:'error', message:null})
      }, 5000)
    }
    console.log(`logging in with ${user}`)
  } 

  const handleLogout  = (event) => {
    event.preventDefault()
    try {

      window.localStorage.removeItem('loggedBlogAppUser')
      setUser(null)
    } catch (exception) {
      setNotification({type:'error', message:'Ooops'})
      setTimeout(() => {
        setNotification({type:'error', message:null})
      }, 5000)
    }
    console.log(`logged out`)
  } 

  const handleSaveBlog  = async (event) => {
    try {
      const newBlog = await blogService.create({
        title, author, url, likes
    })
      console.log("blog", title, author, url, likes)
      blogService.setToken(user.token)
      setTitle('')
      setAuthor('')
      setUrl('')
      setLikes('')
    } catch (exception) {
      setNotification({type:'error', message:'Wrong credentials'})
      setTimeout(() => {
        setNotification({type:'error', message:null})
      }, 5000)
    }
    console.log(`logging in with ${user}`)
  } 

  const loginForm = () => (
    <div>
    <h3>Login</h3>
    <form onSubmit={handleLogin}>
      <section>
        <label>
          Username
          <div>
        <input
        type="text"
        value={username}
        name="username"
        id="username"
        onChange={({ target }) => setUsername(target.value)}
        />
        </div>
      </label>

      <label>Password  
        <div>
        <input
        type="password"
        value={password}
        name="password"
        id="password"
        onChange={({ target }) => setPassword(target.value)}
        />
        </div>
      </label>
        <button type="submit">Login</button>
      </section>
    </form>    
    </div>  
  )

  const saveBlogForm = () => (
    <div>
    <h3>Create New</h3>
    <form onSubmit={handleSaveBlog}>
      <section>
        <label>
          Title
            <div>
            <input
            type="text"
            value={title}
            name="title"
            id="title"
            onChange={({ target }) => setTitle(target.value)}
            />
          </div>
        </label>
        <label>
            Author  
            <div>
              <input
              type="text"
              value={author}
              name="author"
              id="author"
              onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
          </label>
          <label>
            URL  
            <div>
              <input
              type="text"
              value={url}
              name="url"
              id="url"
              onChange={({ target }) => setUrl(target.value)}
              />
            </div>
        </label>
        <label>
            Likes  
            <div>
              <input
              type="number"
              value={likes}
              name="likes"
              id="likes"
              onChange={({ target }) => setLikes(target.value)}
              />
            </div>
        </label>
        <button type="submit">Create</button>
      </section>
    </form>    
    </div>  
  )

  const blogForm = () => (
    <div>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
    </div>
  )

  return (
    <>
      <table>
        <thead>
          <tr>
        <td><h1>Blogs</h1></td><td><button onClick={handleLogout}>Logout</button></td>
        </tr>
        </thead>
      </table>
      {user && blogForm()}
      {user && saveBlogForm()}
      {!user && loginForm()}
      <Notification type={notification.type && notification.type} message={notification.message && notification.message} />

    </>
  )
}

export default App