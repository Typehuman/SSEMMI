<template>
<div>
  <!-- Title and header on the UI -->
    <header class="register--header">
      <h1>SSEMMI CLIENT</h1>
      <span>Create User</span>
    </header>
    <section class="register--section">
      <!-- UI for passing register details -->
      <form class='register--form' @submit="register">
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
          <mdb-btn type='submit' color="white">Invite User</mdb-btn>
        </fieldset>
      </form>
    </section>
    <mdb-tbl hover id="register-list-container">
      <mdb-tbl-head>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Invite sent</th>
          <th>Status</th>
        </tr>
      </mdb-tbl-head>
      <mdb-tbl-body>
        <tr>
          <th>John Doe</th>
          <td>jdoe@testmail.com</td>
          <td>11.12 AM 31/01/21</td>
          <td>Invite Sent</td>
        </tr>
      </mdb-tbl-body>
    </mdb-tbl>
</div>
</template>

<script>
import { mdbInput, mdbBtn, mdbTbl, mdbTblHead, mdbTblBody } from 'mdbvue';
import axios from 'axios';

export default {
  name: 'Register',
  components: {
    mdbInput,
    mdbBtn,
    mdbTbl,
    mdbTblHead,
    mdbTblBody
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
    padding-left: 5%;
    width: 40%;
    margin: auto;
    position: relative;
  }

  #register-list-container {
    width: 80%;
    padding-left: 5%;
    /* margin: auto; */
    /* display: inline-table; */
  }
</style>
