import { useState, useEffect, useRef } from 'react'
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

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => { return b.likes - a.likes }))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
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
      setNotification({ type: 'notification', message: `Welcome ${user.username}!` })
      setTimeout(() => {
        setNotification({ type: 'notification', message: null })
      }, 5000)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification({ type: 'error', message: 'Wrong credentials' })
      setTimeout(() => {
        setNotification({ type: 'error', message: null })
      }, 5000)
    }
    console.log(`logging in with ${user}`)
  }

  const handleLogout = (event) => {
    event.preventDefault()
    try {

      window.localStorage.removeItem('loggedBlogAppUser')
      setUser(null)
    } catch (exception) {
      setNotification({ type: 'error', message: exception })
      setTimeout(() => {
        setNotification({ type: 'error', message: null })
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      blogService
        .create(blogObject)
        .then(returnedBlog => {
          setBlogs([...blogs, returnedBlog])
        })
      setNotification({ type: 'notification', message: 'Created new blog' })
      setTimeout(() => {
        setNotification({ type: 'notification', message: null })
      }, 5000)
    } catch (exception) {
      setNotification({ type: 'error', message: `Blog creation failed: ${exception}` })
      setTimeout(() => {
        setNotification({ type: 'error', message: null })
      }, 5000)
    }
  }

  const editBlog = (id, blogObject) => {
    try {
      blogService
        .update(id, blogObject)
        .then(returnedBlog => {
          const editedBlogs = blogs.map((blog) => {
            return blog.id === returnedBlog.id ?
              returnedBlog : blog
          })
          setBlogs(editedBlogs)
        })
      setNotification({ type: 'notification', message: 'Blog updated' })
      setTimeout(() => {
        setNotification({ type: 'notification', message: null })
      }, 5000)
    } catch (exception) {
      setNotification({ type: 'error', message: `Blog failed to update: ${exception}` })
      setTimeout(() => {
        setNotification({ type: 'error', message: null })
      }, 5000)
    }
  }

  const deleteBlog = (id) => {
    try {
      blogService.remove(id)
      const blogsWithoutDeleted = blogs.filter(blog => blog.id !== id)
      setBlogs(blogsWithoutDeleted)
      setNotification({ type: 'notification', message: 'Blog deleted' })
      setTimeout(() => {
        setNotification({ type: 'notification', message: null })
      }, 5000)
    } catch (exception) {
      setNotification({ type: 'error', message: `Blog failed to delete: ${exception}` })
      setTimeout(() => {
        setNotification({ type: 'error', message: null })
      }, 5000)
    }
  }

  const blogForm = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} editBlog={editBlog} deleteBlog={deleteBlog} blog={blog} loggedUser={user.username} />
      )}
    </div>
  )

  return (
    <>
      <table>
        <thead>
          <tr>
            <td><h1>Blogs</h1></td><td>{user && <button onClick={handleLogout}>Logout</button>}</td>
          </tr>
        </thead>
      </table>
      {user && blogForm()}
      {user && <Togglable buttonLabel="New blog" ref={blogFormRef}>
        {user && <NewBlogForm createBlog={addBlog} />}
      </Togglable>}
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