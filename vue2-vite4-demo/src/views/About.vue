<template>
  <div class="about">
    <h1>About Page</h1>
    <p>This is the about page for our Vue 2.7 demo application with routing.</p>
    <ul>
      <li><a href="https://router.vuejs.org/" target="_blank">Vue Router Documentation</a></li>
      <li><a href="https://github.com/vuejs/vue-router" target="_blank">GitHub Repository</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.about {
  text-align: center;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

a {
  color: #42b983;
}
</style>