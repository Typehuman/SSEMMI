<template>
  <div>
    <div id="navbar-top">
      <mdb-navbar color="black" dark>
        <mdb-navbar-brand router to="/">
          <!-- <router-link id="title" to="/" class='btn'>SSEMMI Client</router-link> -->
          SSEMMI Client
        </mdb-navbar-brand>
        <mdb-navbar-toggler>
          <mdb-navbar-nav right>
            <mdb-nav-item router to="/login" v-if="!isAuth" >Login</mdb-nav-item> 
            <mdb-nav-item router to="/dashboard" v-if="isAuth" >Dashboard</mdb-nav-item>
            <mdb-nav-item router to="/register" v-if="!isAuth">Register</mdb-nav-item>
            <mdb-nav-item router to="/about" >About</mdb-nav-item>
            <mdb-nav-item router to="/data-explorer" v-if="isAuth" >Data Explorer</mdb-nav-item>
            <mdb-nav-item router to="/historical" v-if="isAuth" >Historical</mdb-nav-item>
            <mdb-nav-item router to="/approvals" v-if="isAdmin" >Approvals</mdb-nav-item>
            <mdb-nav-item router to="/" @click="logoutMethod" v-if="isAuth" >Logout</mdb-nav-item>
          </mdb-navbar-nav>
        </mdb-navbar-toggler>
      </mdb-navbar>
    </div>
    <div id="app">
      <!-- Adding dependency for mapbox css for map visualisation -->
      <router-view/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav, mdbNavItem } from 'mdbvue';

export default {
  components: {
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbNavItem
  },
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
  clear: both;
}

#title {
  text-align: left;
  font-weight: bold;
  display: inline;
  /* position: relative;
  left: -50px; */
  float: left;
}

#navbar-top li {
  /* Adding space between each navbar items. "li" is used as mdb-nav-item will be compiled into list components */
  padding-right: 10px;
  padding-left: 10px;
}

</style>
