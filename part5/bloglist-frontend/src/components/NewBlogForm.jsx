import React from "react";

const NewBlogForm = ({  }) => {

    return (
        <>
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
        </>  
    )
}