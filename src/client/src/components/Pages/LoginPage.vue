// LOGIN PAGE

<template>
<div class="container" id='app'>
  <div class="login">
    <header class="login--header">
      <h1>SSEMMI CLIENT</h1>
      <span>LOGIN</span>
    </header>
    <section class="login--section">
      <form class='login--form'>
        <fieldset>
          <input type="text" placeholder='Username' required />
        </fieldset>
        <fieldset>
          <input type="password" placeholder='Password' required/>
        </fieldset>
        <fieldset>
          <button type='submit' class='btn'>Submit</button>
        </fieldset>
      </form>
    </section>
  </div>
  <RegisterForm/>
</div>
</template>

<script>
import RegisterForm from './RegisterPage'

export default {
  name: 'App',
  components: {
    RegisterForm
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

.container {
  background: none;
  width: 400px;
  margin: 4rem auto 0;
  text-align: center;
  box-shadow: 0 1rem 1rem 0 rgba(0, 0, 0, .15);
  position: relative;
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