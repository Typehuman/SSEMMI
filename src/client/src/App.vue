<template>
  <div id="app">
  <div id="nav">
    <router-link to="/">Login</router-link>
    |
    <router-link to="/dashboard"> Dashboard</router-link>
  </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#nav {
  font-weight: bold;
}
</style>
