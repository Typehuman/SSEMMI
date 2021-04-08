<template>
<div>
  <!-- Title and header on the UI -->
  <div style="padding: 5%">
    <section class="register--section">
      <!-- UI for passing register details -->
      <div>
        <form class='register--form' @submit="register">
          <h1 id="register-heading">Register</h1>
          <fieldset>
            <mdb-input placeholder="Email:" name="Email" v-model.trim="registerUserData.initEmail" type="email" required/>
          </fieldset>
          <fieldset>
            <mdb-input placeholder="Confirm email:" v-model.trim="registerUserData.email" name="Confirm email" type="email" required/>
          </fieldset>
          <fieldset>
            <mdb-input placeholder="Password:" v-model.trim="registerUserData.password" name="Password" type="password" required/>
          </fieldset>
          <fieldset>
            <mdb-btn type='submit' color="white" style="right: 32%">Invite User</mdb-btn>
          </fieldset>
        </form>
      </div>
    </section>
  </div>
</div>
</template>

<script>
import { mdbInput, mdbBtn } from 'mdbvue';
import axios from 'axios';

export default {
  name: 'Register',
  components: {
    mdbInput,
    mdbBtn,
  },
  data() {
    return {
      registerUserData: {},
      errors: [],
      VUE_APP_MASTER_KEY: process.env.VUE_APP_MASTER_KEY
    };
  },
  methods: {
    register(event) {
      if (!this.registerUserData.email) {
        alert('Email required.')
        return false
      }

      if (this.registerUserData.email != this.registerUserData.initEmail) {
        alert('Email does not match.')
        return false
      }

      if (!this.registerUserData.password) {
        alert('Password required.')
        return false
      }
      // Check for event error to prevent propagation
      event.preventDefault()

      const regUserRequst = {
        'email': this.registerUserData.email,
        'password': this.registerUserData.password,
        'access_token': this.VUE_APP_MASTER_KEY
      }

      //Header post method to pass user details by passing created user details
      axios.post(`${process.env.VUE_APP_WEB_SERVER_URL}/apiv1/users/`, regUserRequst)
      // Redirect to requested page
      .then( regUser => {
        console.log(`Successfully added ${regUser.data}`)
        this.$router.push({name: 'Dashboard'})
      })
      // Check for request errors
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
  form {
    float: left;
    padding-left: 8%;
    width: 40%;
    margin: auto;
    position: relative;
  }

  #register-heading {
    position: relative;
    right: 32%;
  }
</style>
