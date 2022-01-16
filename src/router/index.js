import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/views/Home'
import Movie from "@/views/Movie";

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/:id',
    name: 'movie',
    component: Movie
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
