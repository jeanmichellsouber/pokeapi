<template lang="pug">
  .home
    .text-center
      h4 {{appName}}
      img(src='../assets/pikachu.png' :title='appName' :alt='appName')
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  data(){
    return {
      appName: "Pokémon Rest API Test SPA"
    }
  }
}
</script>

<style lang="sass">
  img
    width: 200px
    height: auto
</style>