<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" v-if="!isAuth">Login</router-link>
      |
      <router-link to="/dashboard" v-if="isAuth">Dashboard</router-link>
      |
      <router-link to="/register">Register</router-link>
      |
      <router-link to="/approvals" v-if="isAdmin">Approvals</router-link>
      |
      <button to="/" @click="logoutMethod" v-if="isAuth">Logout</button>
    </div>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  created() {
    axios.interceptors.response.use(undefined, (err) => {
      return new Promise( (resolve, reject) => {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          // if get an unauthorized, logout the user
          this.$store.dispatch('auth_logout')
          // redirect to login
          this.$router.push('/login')
          resolve()
        } else {
          reject(err)
          throw err
        }
      })
    })
  },
  methods: {
    logoutMethod() {
      this.$store.dispatch('auth_logout')
      .then( () => {
        // Redirect to login
        this.$router.push('/')
        this.$router.go()
      })
    }
  },
  computed: {
    isAuth() {
      return this.$store.state.isAuthenticated
    },
    isAdmin() {
      return this.$store.state.isAdmin
    }
  }
}
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#nav {
  font-weight: bold;
}
</style>
