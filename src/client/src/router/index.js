import Vue from "vue"
import Router from "vue-router"
import Login from "../components/Pages/LoginPage"
import Dashboard from "../components/Pages/DashboardPage"
import Register from "../components/Pages/RegisterPage"

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    }
  ]
})
