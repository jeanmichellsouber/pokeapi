import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Pokemons from '../views/Pokemons.vue'
import Pokemon from '../views/Pokemon.vue'
import Page404 from '../views/Page404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pokemons',
    name: 'Pokémons',
    component: Pokemons
  },
  {
    path: '/pokemon/:id',
    name: 'Pokémon',
    component: Pokemon
  },
  {
    path: '*',
    name: '404',
    component: Page404
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
