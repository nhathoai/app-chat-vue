<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> | -->
      <!-- <router-link to="/about">About</router-link> -->
    </div>
    <router-view/>
  </div>
</template>
<script>
// @ is an alias to /src
</script>
<style>
/* @import url('https://fonts.googleapis.com/css?family=Arvo:400,700,700i&display=swap'); */
@import url('https://fonts.googleapis.com/css?family=Fira+Sans&display=swap');
body{
  margin: 0;
  width: 100%;
  height: 100%;
  font-family: 'Times New Roman', Times, serif;
  font-size: 11px;
}
#app {
  font-family: 'Fira Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100vw;
  height: 100vh;
  opacity: 0.8;
}
.err{
  font-size: .8rem;
  color: red;
}
</style>
