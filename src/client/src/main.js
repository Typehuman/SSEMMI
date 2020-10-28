import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import Login from './components/Pages/LoginPage'
import Dashboard from './components/Pages/DashboardPage'
import Register from './components/Pages/RegisterPage'
import axios from 'axios'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

Vue.config.productionTip = false

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: {
        name: 'Login'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        let isRestricted = store.state.isAuthenticated == false
        let isLegitUser = store.state.token != null

        if(isRestricted && !isLegitUser) {
          next('/login')
        } else {
          next()
        }

      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})


// Setup store with vuex
Vue.use(Vuex)
export const store = new Vuex.Store(
  {
    state: {
      isAuthenticated: false,
      token: null
    },
    mutations: {
      setAuthentication(state, status) {
        state.isAuthenticated = status;
      },
      setUserToken(state, token) {
        state.token = token;
      }
    },
    getters: {
      getUserToken: state => {
        return state.token
      }
    },
    actions: {
      auth_request({commit}, data) {
        return new Promise ((resolve, reject) => {
          const requestOpts = {
            'access_token': process.env.VUE_APP_MASTER_KEY
          }
          //Header post method to authenticate login by passing login details
          axios.post('http://localhost:9000/auth/', requestOpts, {
            auth: {
              username: data.email,
              password: data.password
            }
          })
          // Retreive token and redirect to requested page
          .then( user => {
            // Route protection to the next page
            commit('setAuthentication', true)
            // Save retreived token to state and local storage
            commit('setUserToken', user.data.token)
            localStorage.setItem('userToken', user.data.token)
            // Login success
            console.log(`Login successful, Hello ${user.data.user.name}`)
            console.log(user.data)
            resolve(user)
          })
          // Check for request errors
          .catch(err => {
            commit('setUserToken', null)
            commit('setAuthentication', false)
            localStorage.removeItem('userToken')
            console.log(err)
            alert("Sorry your login details were invalid")
            reject(err)
          })
        })
      }
    }
  }
)

new Vue({
  render: h => h(App),
  store: store,
  router: router
}).$mount('#app')
