import { createWebHistory, createRouter } from "vue-router";
import Home from '../views/Home.vue';
import Anime from '../views/Anime.vue';
import WaifuDetail from '../views/WaifuDetail.vue';
import AnimeDetail from '../views/AnimeDetail.vue';
import GenreDetail from '../views/GenreDetail.vue';
const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home
  },
  {
    name: 'Anime',
    path: '/anime',
    component: Anime
  },
  {
    name: 'WaifuDetail',
    path: '/waifu/:id',
    component: WaifuDetail
  },
  {
    name: 'AnimeDetail',
    path: '/anime/:id',
    component: AnimeDetail,
    props: true
  },
  {
    name: 'GenreDetail',
    path: '/genre/:id',
    component: GenreDetail
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router;