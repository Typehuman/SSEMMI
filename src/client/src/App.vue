<template>
  <div id="app">
    <!-- Adding dependency for mapbox css for map visualisation -->
    <div id="nav">
      <router-link id="title" to="/" class='btn'>SSEMMI Client</router-link>
      <router-link to="/" v-if="!isAuth" class='btn'>Login</router-link>
      <router-link to="/dashboard" v-if="isAuth" class='btn'>Dashboard</router-link>
      <router-link to="/register" class='btn'>Register</router-link>
      <router-link to="/about" class='btn'>About</router-link>
      <router-link to="/data-explorer" class='btn' v-if="isAuth">Data Explorer</router-link>
      <router-link to="/approvals" v-if="isAdmin" class='btn'>Approvals</router-link>
      <button to="/" @click="logoutMethod" class='btn' v-if="isAuth">Logout</button>
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
  color: #2c3e50;
  /* margin-top: 60px; */
  text-align: center;
}

#title {
  text-align: left;
  font-weight: bold;
  display: inline;
  /* position: relative;
  left: -50px; */
  float: left;
}

#nav {
  font-weight: bold;
  display: inline;
  float: right;
  text-align: right;
  width: 100%;
  background: grey;
}

#nav .btn {
  background: white;
  box-shadow: inset 0 0 2px 0 #EEEEEE;
  padding: .3rem 1rem .4rem;
  cursor: pointer;
}
</style>
