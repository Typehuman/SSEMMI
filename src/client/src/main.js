import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import vuexPersistedState from 'vuex-persistedstate'
import Router from 'vue-router'
import Login from './components/Pages/LoginPage'
import Dashboard from './components/Pages/DashboardPage'
import Register from './components/Pages/RegisterPage'
import Approvals from './components/Pages/ApprovalsPage'
import axios from 'axios'
import Clipboard from 'v-clipboard'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

Vue.config.productionTip = false

Vue.use(Clipboard)

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      // Reroutes to login by default upon render
      path: '/',
      redirect: {
        name: 'Login'
      }
    },
    {
      // Login page
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        let hasToken = sessionStorage.getItem('userToken')
        let isAuthenticated = store.state.isAuthenticated == true
        let isLegitUser = store.state.token != null

        if(isAuthenticated && isLegitUser && hasToken) {
          next('/dashboard')
        } else {
          next()
        }
      }
    },
    {
      // Dashboard page for users to claim tokens
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        let hasToken = sessionStorage.getItem('userToken')
        let isRestricted = store.state.isAuthenticated == false
        let isLegitUser = store.state.token != null

        if(isRestricted && !isLegitUser && !hasToken) {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      // Register page to create new users - admin only
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      // Approvals page to confirm user registration
      path: '/approvals',
      name: 'Approvals',
      component: Approvals,
      beforeEnter: (to, from, next) => {
        let hasToken = sessionStorage.getItem('userToken')
        let isRestricted = store.state.isAuthenticated == false
        let isLegitUser = store.state.token != null
        let isAdmin = store.state.isAdmin == true
        if(isRestricted && !isLegitUser && !hasToken) {
          next('/login')
        }
        else if(!isAdmin) {
          next('/dashboard')
        }
        else {
          next()
        }
      }
    }
  ]
})


// Setup store with vuex
Vue.use(Vuex)
export const store = new Vuex.Store(
  {
    state: {
      isAuthenticated: false,
      token: null,
      userDetails: [],
      isAdmin: false,
      userRequestList: []
    },
    mutations: {
      setAuthentication(state, status) {
        state.isAuthenticated = status
      },
      setUserToken(state, token) {
        state.token = token
      },
      setUserDetails(state, userData) {
        state.userDetails = userData
      },
      setIsAdmin(state, status) {
        state.isAdmin = status
      },
      setUserRequestList(state, list) {
        state.userRequestList = list
      }
    },
    getters: {
      getUserToken: state => {
        return state.token
      },
      getUserDetails: state => {
        return state.userDetails.user
      },
      getUserRequestList: state => {
        return state.userRequestList
      }
    },
    actions: {
      // Check session data upon creation or refresh
      init_store({commit}) {
        const userToken = sessionStorage.getItem('userToken')
        if (userToken) {
          commit('setAuthentication', true)
          commit('setUserToken', userToken)
        }
      },
      // Login request
      auth_request({commit}, data) {
        return new Promise ((resolve, reject) => {
          const requestOpts = {
            'access_token': process.env.VUE_APP_MASTER_KEY
          }
          console.log(process.env.VUE_APP_WEB_SERVER_URL)
          //Header post method to authenticate login by passing login details
          axios.post(`${process.env.VUE_APP_WEB_SERVER_URL}/apiv1/auth/`, requestOpts, {
            auth: {
              username: data.email,
              password: data.password
            }
          })
          // Retreive token and redirect to requested page
          .then( user => {
            // Route protection to the next page
            commit('setAuthentication', true)
            // Save retreived token to state and session storage
            commit('setUserToken', user.data.token)
            // Set user data
            commit('setUserDetails', user.data)
            // Check role
            if(user.data.user.role != 'admin') {
              commit('setIsAdmin', false)
            } else {
              commit('setIsAdmin', true)
            }
            sessionStorage.setItem('userToken', user.data.token)
            // Login success
            console.log(`Login successful, Hello ${user.data.user.name}`)
            console.log(user.data)

            resolve(user)
          })
          // Check for request errors
          .catch(err => {
            commit('setUserToken', null)
            commit('setAuthentication', false)
            sessionStorage.removeItem('userToken')
            console.log(err)
            alert("Sorry your login details were invalid")
            reject(err)
          })
        })
      },
      // Logout method
      auth_logout({commit}) {
        return new Promise( (resolve) => {
          if (sessionStorage.getItem('userToken') != null) {
            commit('setUserToken', null)
            commit('setAuthentication', false)
            sessionStorage.clear()
          }
          resolve('Logged out')
        })
      },
      get_user_requests({commit}) {
        return new Promise( (resolve,reject) => {
          // Check if user has admin priviledges
          if (store.state.isAdmin) {
            // Format the admin level header for requesting user requests
            const requestAuth = {
              headers: {
                'Authorization': 'Bearer ' + store.state.userDetails.token,
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }

            // Pass headers of admin to retreive user requests
            axios.get(`${process.env.VUE_APP_WEB_SERVER_URL}/apiv1/users/requests`, requestAuth)
            // Add list of users into the store of user requests
            .then( users => {
              console.log(users.data)
              commit('setUserRequestList', users.data)
              resolve(users)
            })
            .catch(err => {
              console.error(err)
              reject()
            })
          } else {
            // Show error if access to it fails
            throw console.error('Sorry you are not authorised to fetch the data');
          }
        })
      }
    },
    plugins: [vuexPersistedState({
      storage:window.sessionStorage
    })]
  }
)

new Vue({
  render: h => h(App),
  store: store,
  router: router,
  beforeEnter() { this.store.commit('init_store')}
}).$mount('#app')
