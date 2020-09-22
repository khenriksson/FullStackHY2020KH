const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (prev, current) => {
    return prev.likes > current.likes ? prev : current
  }

  return blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
  //   console.log(_.uniq(blogs.author), 'totallikes')
  //   console.log(_.values(_.sum(blogs.likes)), 'values sum blogs')
  const authors = []

  //   blogs.forEach((element) => {
  //     authors.push(element.author)
  //   })
  //   const uniq = _.uniq(authors)
  //   console.log(uniq, 'uniq')

  //   blogs.forEach((element) => {
  //     console.log(element.author, 'element.author')
  //     let sum = 0

  //     authors.forEach((i) => {
  //       console.log(i, 'i')
  //       if (element.author === i) {
  //         ++sum
  //       }
  //     })
  //     console.log(sum, 'sum')
  //     countBlogs.push(sum)
  //   })

  //   console.log(countBlogs, 'countblogs')

  //   console.log(_.countBy(blogs, 'author').map(element => {

  //   }))

  console.log(_.mapValues(blogs, 'author'))

  //   _.sum(_.values(blogs))
  //   _.sum(blogs.totalLikes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
