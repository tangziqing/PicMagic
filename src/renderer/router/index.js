import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: require('@/views/home').default,
      children: [
        {
          path: 'image',
          component: require('@/components/developing').default,
          name: 'image'
        },
        {
          path: 'psd',
          component: require('@/views/psd').default,
          name: 'psd'
        },
        {
          path: 'compress',
          component: require('@/components/developing').default,
          name: 'compress'
        },
        {
          path: 'webp',
          component: require('@/components/developing').default,
          name: 'webp'
        },
        {
          path: 'wallpaper',
          component: require('@/views/wallpaper').default,
          name: 'wallpaper'
        },
        {
          path: 'gallery',
          component: require('@/views/gallery').default,
          name: 'gallery'
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
