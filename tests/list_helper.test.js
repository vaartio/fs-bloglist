const helper = require('./test_helper');
const listHelper = require('../utils/list_helper')

const blogs = helper.initialBlogs

test('dummy returns one', async () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('empty list is zero', async () => {
    const blogs = []

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })
  test('when list has only one blog equals the likes of that', async () => {
    const result = listHelper.totalLikes([blogs[0]])
    expect(result).toBe(7)
  })
  test('of a bigger list is calculated right', async () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favorite', () => {
  test('most liked blog is returned as favorite blog', async () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[2])
  })
})

describe('most blogs', () => {
  test('author who has most blogs is returned', async () => {
    const result = listHelper.mostBlogs(blogs)
    console.log('result', result)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

describe('most likes', () => {
  test('author who has most likes is returned', async () => {
    const result = listHelper.mostLikes(blogs)
    console.log('result', result)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})
