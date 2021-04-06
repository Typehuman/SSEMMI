// LOGIN PAGE

<template>
<div class="login-container">
  <div class="login">
    <!-- Title and header on the UI -->
    <header class="login--header">
      <h1>SSEMMI CLIENT</h1>
      <span>LOGIN</span>
    </header>
    <section class="login--section">
      <!-- UI for passing login details -->
      <form class='login--form' @submit.prevent="loginMethod">
        <fieldset>
          <input type="text" v-model.trim="loginData.email" placeholder='Email' name="email" required />
        </fieldset>
        <fieldset>
          <input type="password" v-model.trim="loginData.password" placeholder='Password' name="password" required/>
        </fieldset>
        <fieldset>
          <button type='submit' class='btn'>Submit</button>
        </fieldset>
      </form>
      <br />
      <mdb-container>
        <mdb-alert :color="logMsgColour" v-if="isLoggingIn">{{logMsgLogin}}</mdb-alert>
      </mdb-container>
      <!-- <h3 id="logForLogin" class="animated bounce infinite slower" v-if="isLoggingIn">{{logMsgLogin}}</h3> -->
    </section>
  </div>
</div>
</template>

<script>
import { mdbContainer, mdbAlert } from 'mdbvue'

export default {
  name: 'Login',
  components: {
    mdbContainer,
    mdbAlert
  },
  data() {
    return {
      loginData: {},
      isLoggingIn: false,
      logMsgLogin: "",
      logMsgColour: "secondary"
    }
  },
  methods: {
    loginMethod() {
      // Hide login message before clicking on submit login details
      this.isLoggingIn = true
      this.logMsgLogin = "Attempting to log you in....."
      this.logMsgColour = "secondary"

      this.$store.dispatch('auth_request', this.loginData)      
      .then( (loginMessage) => {
        console.log(loginMessage)
        // Will change the log upon submit for login to be successful
        this.logMsgLogin = loginMessage
        this.logMsgColour = "success"
        // Redirect to page upon login --admins will be redirected to register
        this.$router.replace({name: 'DataExplorer'})
      })
      .catch( (loginMessage) => {
        console.log(loginMessage)
        // Will change the log upon submit for login to be invalid
        this.logMsgLogin = loginMessage
        this.logMsgColour = "danger"
      })
    }
  }
}
</script>

<style scoped>
  * {
  margin: 0;
  padding: 0;
  font-family: 'Source Sans Pro', sans-serif;
  line-height: 1.5;
}

body {
  background: #607D8B;
}

body, input, button {
  font-size: 1.2rem;
}

fieldset {
  border: none;
}

.login-container {
  background: none;
  width: 400px;
  top: 150px;
  text-align: center;
  box-shadow: 0 1rem 1rem 0 rgba(0, 0, 0, .15);
  position: relative;
  margin: auto;
}

.login {
  z-index: 1;
  position: relative;
  background: white;
  padding: .75rem 1.5rem 1.5rem;
  box-sizing: border-box;
}

.login--header {
  margin-bottom: 1rem;
}

.login--header span {
  font-size: 1rem;
}

.btn {
  background: white;
  box-shadow: inset 0 0 2px 0 #EEEEEE;
  outline: none;
  border: 1px solid darkblue;
  padding: .3rem 1rem .4rem;
  cursor: pointer;
  border-radius: .25rem;
  margin-top: 1rem;
  color: darkblue;
}

.btn:active {
  box-shadow: inset 2px 2px 2px 0 #E0E0E0;
}

input {
  width: 100%;
  border: groove;
  text-align: center;
  outline: none;
  padding: .5rem 1rem;
  box-sizing: border-box;
  background: none;
}

.line {
  transform: translate(0, -1rem);
  stroke-width: .5;
}

.line--default {
  stroke: #ccc;
  transition: all .2s ease-out;
}

input:focus + svg > .line--default {
  stroke: #3F51B5;
}

input:focus:invalid + svg > .line--default {
  stroke: #FF5722;
}

</style>
