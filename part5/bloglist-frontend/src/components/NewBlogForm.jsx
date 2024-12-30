import React from "react";
import { useState } from "react";

const NewBlogForm = ({ 
  createBlog,
}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [likes, setLikes] = useState('')

    const addBlog = (event) => {
      event.preventDefault()
      createBlog({
        title: title,
        author: author,
        url: url,
        likes: likes
      })
      setTitle('')
      setAuthor('')
      setUrl('')
      setLikes('')
    }
    return (
        <>
        <h3>Create New</h3>
        <form onSubmit={addBlog}>
          <section>
            <label>
              Title
                <div>
                <input
                type="text"
                value={title}
                name="title"
                id="title"
                onChange={event => setTitle(event.target.value)}
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
                  onChange={event => setAuthor(event.target.value)}
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
                  onChange={event => setUrl(event.target.value)}
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
                  onChange={event => setLikes(event.target.value)}
                  />
                </div>
            </label>
            <button type="submit">Create</button>
          </section>
        </form>    
        </>  
    )
}

export default NewBlogForm