const routes = require('next-routes');
const routesImplementation = routes();

// routesImplementation
//   .add([identifier], pattern = /identifier, page = identifier)
//   .add('/blog/:slug', 'blogShow')
//   .add('showBlogPostRoute', '/blog/:slug', 'blogShow')

/*routesImplementation.add('/:slug', 'index')
routesImplementation.add('/more/:slug', 'index')
routesImplementation.add('service','/service/:category', 'service')

module.exports = routesImplementation*/

module.exports = routes()
  .add({name: 'beta', pattern: '/service/:category', page: 'service'})
  .add({name: 'beta2', pattern: '/shop/:id_alfred', page: 'shop'});

// Usage inside Page.getInitialProps (req = { pathname, asPath, query } = { pathname: '/', asPath: '/about', query: { slug: 'about' } })
