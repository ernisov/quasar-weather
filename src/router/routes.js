
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/:city?', component: () => import('pages/CityWeather.vue') }
    ]
  },

  {
    path: '/search',
    component: () => import('layouts/FullScreenLayout.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
