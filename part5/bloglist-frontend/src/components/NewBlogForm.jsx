import React from "react";

const NewBlogForm = ({ 
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  handleLikesChange,
  title,
  author,
  url,
  likes
}) => {
  // const [toggleNewBlogForm, setToggleNewBlogForm] = useState(false)
  // const [handleSubmitNewBlogForm, setHandleSubmitNewBlogForm] = useState()
  // const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [url, setUrl] = useState('')
  // const [likes, setLikes] = useState('')

    return (
        <>
        <h3>Create New</h3>
        <form onSubmit={handleSubmit}>
          <section>
            <label>
              Title
                <div>
                <input
                type="text"
                value={title}
                name="title"
                id="title"
                onChange={handleTitleChange}
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
                  onChange={handleAuthorChange}
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
                  onChange={handleUrlChange}
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
                  onChange={handleLikesChange}
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