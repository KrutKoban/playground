<template>
  <div id="app">
    <TransactionList/>
  </div>
</template>

<script>
import TransactionList from './components/TransactionList.vue'

export default {
  name: 'App',
  components: {
    TransactionList
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  padding-top: 40px;
  background: #1E1D2F;
}
</style>
