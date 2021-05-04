<template>
  <div>
    <div id="navbar-top">
      <mdb-navbar color="black" dark>
        <mdb-navbar-brand router to="/home">
          SSEMMI Client
        </mdb-navbar-brand>
        <mdb-navbar-toggler>
          <mdb-navbar-nav right>
            <mdb-nav-item router to="/about" >About</mdb-nav-item>
            <mdb-nav-item router to="/dashboard" v-if="isAuth" >Contribute</mdb-nav-item>
            <mdb-dropdown tag="li" class="nav-item" v-if="isAuth">
              <mdb-dropdown-toggle tag="a" navLink slot="toggle" >Browse</mdb-dropdown-toggle>
              <mdb-dropdown-menu>
                <mdb-dropdown-item router to="/data-explorer" v-if="isAuth" >Short-term</mdb-dropdown-item>
                <mdb-dropdown-item router to="/historical" v-if="isAuth" >Historical</mdb-dropdown-item>
              </mdb-dropdown-menu>
            </mdb-dropdown>
            <mdb-nav-item router to="/manage-users" v-if="isAuth & isAdmin" >Manage Users</mdb-nav-item>
            <mdb-nav-item router to="/login" v-if="!isAuth">Login</mdb-nav-item>
            <mdb-nav-item router to="/register" v-if="!isAuth">Sign Up</mdb-nav-item>
            <mdb-nav-item @click="logoutMethod" href="/" v-if="isAuth" >Logout</mdb-nav-item>
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
import { mdbNavbar, mdbNavbarBrand, mdbNavbarToggler, mdbNavbarNav, mdbNavItem, mdbDropdown, mdbDropdownToggle, mdbDropdownMenu, mdbDropdownItem } from 'mdbvue';

export default {
  components: {
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbNavItem,
    mdbDropdown,
    mdbDropdownToggle,
    mdbDropdownMenu,
    mdbDropdownItem
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

#dropdown-manage .dropdown-menu {
  left: -50;
}

</style>
