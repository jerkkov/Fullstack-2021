
const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogPost) => {
    return blogPost.reduce(
        (total, currBlog) => 
        total + currBlog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map(blogPost => blogPost.likes))
  const favoriteBlog = blogs.filter(blogPost => blogPost.likes === mostLikes)
  return favoriteBlog[0]

}


  
  module.exports = {
    dummy, totalLikes, favoriteBlog
  }