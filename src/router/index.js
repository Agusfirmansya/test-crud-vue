import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Note from '../components/Note.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/note/:id',
      name: 'detail',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/Detail.vue')
    },
    {
      path: '/note',
      name: 'note',
      component: Note
    }
  ]
})

export default router