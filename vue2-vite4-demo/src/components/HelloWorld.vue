<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    <p>
      This is a Vue 2.7 project created with a custom configuration.
    </p>
    <ul>
      <li><a href="https://vuejs.org/v2/guide/" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://vuejs.org/v2/api/" target="_blank" rel="noopener">API Reference</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  color: #42b983;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>