const client = require('./client')

module.exports = {
  exportPathMap: async function(defaultPathMap) {
    const path = await client
      .fetch(
        `{
          "posts": '*[_type == "post" && defined(slug)].slug.current',
          "authors": '*[_type == "author" && defined(slug)].slug.current'
        }`
      )
      .then(data =>
        data.posts.reduce(
          (acc, slug) => ({
            '/': { page: '/' },
            ...acc,
            [`/p/${slug}`]: { page: '/post', query: { slug } }
          }),
          defaultPathMap
        )
        .concat(
          data.authors.reduce(
            (acc, slug) => ({
              ...acc,
              [`/a/${slug}`]: { page: '/author', query: { slug } }
            }),
            defaultPathMap
          )
        )
      )
      .catch(console.error);
    return path;
  }
};