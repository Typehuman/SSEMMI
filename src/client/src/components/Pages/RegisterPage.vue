<template>
<div>
  <!-- Title and header on the UI -->
  <div style="padding: 5%">
    <section  class="register--section">
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
            <mdb-input placeholder="Password:" v-model.trim="registerUserData.initPassword" name="Password" type="password" required/>
          </fieldset>
          <fieldset>
            <mdb-input placeholder="Confirm Password:" v-model.trim="registerUserData.password" name="Confirm Password" type="password" required/>
          </fieldset>
          <fieldset>
            <br>
          </fieldset>
          <!-- Checkbox to enquire purpose of signing up and use of application (pop up after signup submission) -->
          <div class='use-ssemmi-form align-items-center'>
            <h5 id="use-ssemmi-heading">How do you intend to use SSEMMI?</h5>
            <br>
            <fieldset>
              <mdb-input type="checkbox" name="BrowseData" />
              <label for="BrowseData">Browse Data</label>
            </fieldset>
            <br>
            <fieldset>
              <mdb-input type="checkbox" name="BrowseData" />
              <label for="ContributeData">Contribute Data</label>
            </fieldset>
            <br>
            <fieldset>
              <mdb-input type="checkbox" name="BrowseData" />
              <label for="OtherUse">Other</label>
            </fieldset>
            <br>
            <fieldset id="btn-signup-submit">
              <mdb-btn type='submit' color="white" style="right: 0%">Sign Up</mdb-btn>
            </fieldset>
          </div>
        </form>
      </div>
    </section>
    <!-- Component for explainer text -->
    <section id="div-explainer">
      <mdb-card>
        <mdb-card-body>
          <mdb-card-title>Title</mdb-card-title>
          <mdb-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </mdb-card-text>
          <mdb-card-text>Explainer text</mdb-card-text>
        </mdb-card-body>
      </mdb-card>
    </section>
  </div>
</div>
</template>

<script>
import { mdbInput, mdbBtn, mdbCard, mdbCardBody, mdbCardTitle, mdbCardText } from 'mdbvue';
import axios from 'axios';

export default {
  name: 'Register',
  components: {
    mdbInput,
    mdbBtn,
    mdbCard,
    mdbCardBody,
    mdbCardTitle,
    mdbCardText
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
        alert('Emails do not match.')
        return false
      }

      if (!this.registerUserData.password) {
        alert('Password required.')
        return false
      }

      if (this.registerUserData.password != this.registerUserData.initPassword) {
        alert('Passwords do not match.')
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
    right: 37%;
  }

  #div-explainer {
    width: 40%;
    top: 6vh;
    right: -30vh;
    margin: 10px;
    background-color: transparent;
    display: inline-block;
  }

  #section-on-use {
    width: 40%;
    padding-left: 70px;
    display: block;
  }

  .use-ssemmi-form label {
    float: left;
    clear: left;
  }

  #use-ssemmi-heading {
    position: relative;
    right: 22%;
    font-weight: 300;
  }

  #section-on-use ul {
    /* margin: 0; */
    list-style: none;
    float: left;
  }

  #btn-signup-submit {
    padding-top: 40px;
    padding-bottom: 40px;
  }
</style>
