import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import VeeValidate from 'vee-validate';
import CreateUser from './views/CreateUser.vue'
import Swal from 'vue-sweetalert2';

Vue.use(Router)
Vue.use(VeeValidate)
Vue.use(Swal)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/create',
      name: 'createUser',
      component: CreateUser
    },
  ]
})
