const _ = require('lodash-core')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return 0
  }
  return blogs.reduce((sum, currentBlog) => sum + currentBlog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null
  }
  return blogs.reduce((favorite, current) => current.likes > favorite.likes ? current : favorite, blogs[0])
}

const mostBlogs = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, 'author')
  let mostBlogsAuthor = null
  Object.entries(groupedByAuthor).forEach(([authorName, authorBlogs]) => {
    if (!mostBlogsAuthor || authorBlogs.length > mostBlogsAuthor.blogs) {
      mostBlogsAuthor = {
        author: authorName,
        blogs: authorBlogs.length,
      }
    }
  })
  return mostBlogsAuthor
}

const mostLikes = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, 'author')
  let mostLikesAuthor = null
  Object.entries(groupedByAuthor).forEach(([authorName, authorBlogs]) => {
    const authorLikes = authorBlogs.reduce((sum, current) => sum + current.likes, 0)
    if (!mostLikesAuthor || authorLikes > mostLikesAuthor.likes) {
      mostLikesAuthor = {
        author: authorName,
        likes: authorLikes
      }
    }
  })

  return mostLikesAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
