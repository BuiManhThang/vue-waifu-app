import { createWebHistory, createRouter } from "vue-router";
import Home from '../views/Home.vue';
import Anime from '../views/Anime.vue';
import WaifuDetail from '../views/WaifuDetail.vue';
import AnimeDetail from '../views/AnimeDetail.vue';
import GenreDetail from '../views/GenreDetail.vue';
import Register from '../views/Register.vue';
import LogIn from '../views/LogIn.vue';
import Infor from '../views/Infor.vue';
import Users from '../views/Users.vue';
import Genre from '../views/Genre.vue';
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
  },
  {
    name: 'Register',
    path: '/register',
    component: Register
  },
  {
    name: 'LogIn',
    path: '/login',
    component: LogIn
  },
  {
    name: 'Infor',
    path: '/user/infor',
    component: Infor
  },
  {
    name: 'Users',
    path: '/users',
    component: Users
  },
  {
    name: 'Genre',
    path: '/genre',
    component: Genre
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router;