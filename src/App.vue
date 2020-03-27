<template>
  <div>
    <router-view />
    <notifications />
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style>
  .cursor-pointer{
    cursor: pointer
  }
</style>
