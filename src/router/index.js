// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/App.vue'),
    children: [
      {
        path: '',
        name: 'MainMenu',
        component: () => import(/* webpackChunkName: "home" */ '@/views/MainMenu.vue'),
      },
      {
        path: '/characterSelect',
        name: 'CharacterSelect',
        component: () => import(/* webpackChunkName: "characterSelect" */ '@/views/CharacterSelect.vue'),
      },
      {
        path: '/firstScene',
        name: 'FirstScene',
        component: () => import(/* webpackChunkName: "firstScene" */ '@/views/scenes/FirstScene.vue'),
      },
      {
        path: '/secondScene',
        name: 'SecondScene',
        component: () => import(/* webpackChunkName: "secondScene" */ '@/views/scenes/SecondScene.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
