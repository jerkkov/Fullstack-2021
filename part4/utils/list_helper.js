
const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogPost) => {
    return blogPost.reduce(
        (total, currBlog) => 
        total + currBlog.likes, 0)
}
const favoriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map(blog => blog.likes))
  const favoriteBlog = blogs.find(blog => blog.likes >= mostLikes)
  return favoriteBlog

}


  
  module.exports = {
    dummy, totalLikes, favoriteBlog
  }