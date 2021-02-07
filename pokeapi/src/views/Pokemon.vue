<template lang="pug">
  .page#pokemon
    .text-center
      h4 {{this.pokemonData.name.toUpperCase()}}
      img(:src="this.pokemonData.sprites['front_default']")

    .content
      .division
        h5 Altura
        p
          span {{this.pokemonData.height}}
      .division
        h5 Peso
        p
          span {{this.pokemonData.weight}}
      .division
        h5 Order
        p
          span {{this.pokemonData.order}}
      .division
        h5 Tipos
        p
          ul
            li(v-for="hab in this.pokemonData.types" :key='hab.type.name' v-text="hab.type.name")
      .division
        h5 Habilidades
        p
          ul
            li(v-for="hab in this.pokemonData.abilities" :key='hab.ability.name' v-text="hab.ability.name")

</template>

<style lang="sass">
  #pokemon
    .content
      justify-content: center
    .division
      border-bottom: solid 1px #027BE3
      border-right: solid 10px #fff
      h5
        margin: 10px 0
        font-weight: 300
</style>

<script>

export default {
  name: 'Pokemon',
  components: {
    
  },
  data() {
    return {
      pokemonData: {}
    }
  },  
  mounted() {
      this.axios.get(`https://pokeapi.co/api/v2/pokemon/${this.$route.params.id}`)
      .then((response) => {
        
        this.pokemonData = response.data;

      }).catch((error)=>{
        console.log(error);
      }).finally(()=>{
        this.scrollUp()
      })    
  },
  watch: {
    sorting: function(){

    }
  },
  methods: {
    
  },
}
</script>
