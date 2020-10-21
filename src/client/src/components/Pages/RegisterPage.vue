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
          <mdb-input placeholder="email" name="Email" icon="envelope" type="email" required/>
        </fieldset>
        <fieldset>
          <mdb-input placeholder="confirm email" v-model.trim="registerUserData.email" name="Confirm email" icon="exclamation-triangle" type="text" required/>
        </fieldset>
        <fieldset>
          <mdb-input placeholder="password" v-model.trim="registerUserData.password" name="Password" icon="lock" type="password" required/>
        </fieldset>
        <fieldset>
          <mdb-btn type='submit' color="primary">Register User</mdb-btn>
        </fieldset>
      </form>
    </section>
</div>
</template>

<script>
import { mdbInput, mdbBtn } from 'mdbvue';
import axios from 'axios';

export default {
  name: 'Register',
  components: {
    mdbInput,
    mdbBtn
  },
  data() {
    return {
      registerUserData: {}
    };
  },
  methods: {
    register(event) {
      // Check for event error to prevent propagation
      event.preventDefault()

      const regUserRequst = {
        'email': this.registerUserData.email,
        'password': this.registerUserData.password,
        'access_token': process.env.MASTER_KEY
      }

      //Header post method to pass user details by passing created user details
      axios.post('http://localhost:9000/users/', regUserRequst)
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

