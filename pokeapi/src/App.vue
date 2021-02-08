<template lang="pug">
  q-layout(view='hHh lpR fFf')
    q-header.bg-primary.text-white(height-hint='98' align='center')
      q-toolbar
        q-toolbar-title
          | Pokémon Rest API Test SPA
      q-tabs.line(align='center')
        q-route-tab(to='/pokemons' label='Pokémons')
        q-route-tab(to='/location' label='Location')
    q-page-container
      router-view
</template>

<script>

export default {
  name: 'LayoutDefault'
}
</script>

<style lang="sass">
  .line
    border-top: solid 1px rgba(0,0,0,0.2)
</style>
