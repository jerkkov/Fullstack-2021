import { useState, useEffect } from 'react'
import '../index.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({})

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')


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
    event.preventDefault()
    try {
      const newBlog = await blogService.create({
        title, author, url, likes
    })
      console.log("blog", title, author, url, likes)
      blogService.setToken(user.token)
      setNotification({type:'notification', message:`Created new blog ${title}`})
      setBlogs([...blogs, newBlog])
      setTimeout(() => {
        setNotification({type:'notification', message:null})
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
      setLikes('')
    } catch (exception) {
      setNotification({type:'error', message:'Oops'})
      setTimeout(() => {
        setNotification({type:'error', message:null})
      }, 5000)
    }
  } 

  // const loginForm = () => (
  //   <div>
  //   <h3>Login</h3>
  //   <form onSubmit={handleLogin}>
  //     <section>
  //       <label>
  //         Username
  //         <div>
  //       <input
  //       type="text"
  //       value={username}
  //       name="username"
  //       id="username"
  //       onChange={({ target }) => setUsername(target.value)}
  //       />
  //       </div>
  //     </label>

  //     <label>Password  
  //       <div>
  //       <input
  //       type="password"
  //       value={password}
  //       name="password"
  //       id="password"
  //       onChange={({ target }) => setPassword(target.value)}
  //       />
  //       </div>
  //     </label>
  //       <button type="submit">Login</button>
  //     </section>
  //   </form>    
  //   </div>  
  // )

  // const saveBlogForm = () => (
   
  // )

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
      {user && <NewBlogForm 
        handleSubmit={handleSaveBlog}
        handleTitleChange={({ target }) => setTitle(target.value)}
        handleAuthorChange={({ target }) => setAuthor(target.value)}
        handleUrlChange={({ target }) => setUrl(target.value)}
        handleLikesChange={({ target }) => setLikes(target.value)}
        title={title}
        author={author}
        url={url}
        likes={likes} />}
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