import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import VeeValidate from 'vee-validate';

Vue.use(Router)
Vue.use(VeeValidate)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
  ]
})
