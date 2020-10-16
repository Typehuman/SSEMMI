// LOGIN PAGE

<template>
  <div class="LoginPage">
      <h1>SSEMMI API</h1>
    <legend>Login Page</legend>
    <!-- Form -->
    <form>
        <!-- Email address input -->
        <div class="form-group">
            <label>Username</label>
            <input type="username" class="form-control form-control-lg"/>
        </div>
        <!-- Password input -->
        <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control form-control-lg"/>
        </div>
    </form>
    <button>Submit</button>
    <button>Forgot my password</button>
    <button>Register for a new account</button>
  </div>
</template>

<script>
</script>

<style scoped>
  .LoginPage {
    text-align: center;
  }
</style>