import Vue from 'vue'
import Router from 'vue-router'
import User from "./components/user/User";
import Auth from "./components/user/Auth";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
  ]
})
