
/**
* Components are lazy-loaded - See "Grouping Components in the Same Chunk"
* http://router.vuejs.org/en/advanced/lazy-loading.html
*/
/* eslint-disable global-require */
const XPosts = r => require.ensure([], () => r(require('./main')), 'xposts-bundle')
const Form = r => require.ensure([], () => r(require('./form')), 'xposts-bundle')

const meta = {
  requiresAuth: true,
}

export default [
  {
    name: 'xposts.index',
    path: '/xposts',
    component: XPosts,
    meta,
    children: [
      {
        name: 'xposts.new',
        path: 'create',
        component: Form,
        meta,
      }, {
        name: 'xposts.edit',
        path: ':id/edit',
        component: Form,
        meta,
      },
    ],
  },
]
