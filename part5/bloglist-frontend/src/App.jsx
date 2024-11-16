import { useState, useEffect } from 'react'
import '../index.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

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
      setNotification({type:'error', message:exception})
      setTimeout(() => {
        setNotification({type:'error', message:null})
      }, 5000)
    }
    console.log(`logged out`)
  } 

  const addBlog = (blogObject) => {
    try {
      blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs([...blogs, returnedBlog])
      })
      setNotification({type:'notification', message:`Created new blog ${title}`})
      setTimeout(() => {
        setNotification({type:'notification', message:null})
      }, 5000)
    } catch (exception) {
      setNotification({type:'error', message:exception})
      setTimeout(() => {
        setNotification({type:'error', message:null})
      }, 5000)
    }

  }

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
      <Togglable buttonLabel="New blog">
      {user && <NewBlogForm createBlog={addBlog} />}
      </Togglable>
      {!user && <LoginForm 
        username={username} 
        password={password} 
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin} />}
      <Notification type={notification.type && notification.type} message={notification.message && notification.message} />

    </>
  )
}

export default App