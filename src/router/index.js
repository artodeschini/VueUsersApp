import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CadastroUsuario from '../views/CadastroUsuario.vue';
import LoginView from '../views/LoginView.vue';
import ListUsers from '../views/ListUsers.vue';
import axios from 'axios';

function AdminAuth(to, from, next) {
  if (localStorage.getItem('token') != undefined) {
    let token = localStorage.getItem("token");
    let axiosConfig = {
      headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    }
    axios.post('http://localhost:8888/validate', {}, axiosConfig).then(res => {
      console.log(res);
      next();
    }).catch(err => {
      console.log(err);
      next("/login");
    });
  } else {
    next("/login");
  }
}

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/admin/users',
    name: 'Users',
    component: ListUsers,
    beforeEnter: AdminAuth
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cadastro',
    name: 'cadastroUsuario',
    component: CadastroUsuario
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
