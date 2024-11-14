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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])  
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    console.log(loggedUserJSON)
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
      setUsername('')
      setPassword('')
      console.log(user)
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

  const blogForm = () => (
    <div>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
    </div>
  )

  return (
    <div>
      <h1>Blogs</h1>
      {user && blogForm()}
      {!user && loginForm()}
      <Notification type={notification.type && notification.type} message={notification.message && notification.message} />

    </div>
  )
}

export default App