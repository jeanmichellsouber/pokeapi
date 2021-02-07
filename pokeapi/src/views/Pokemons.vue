<template lang="pug">
  .page
    h4.text-center Pokémons List
    .text-center(v-if='isLoading')
      q-spinner-ios(color='primary' size='2em')
    .wrapper(v-if='!isLoading')
      .text-center
        q-input(label='Insira o nome de um pokémon para buscar')
        br
        q-toggle(
          :false-value="false"
          :label="`Ordenar alfabeticamente`"
          :true-value="true"
          color="green"
          v-model="sorting"          
        )        
      .content
        q-item.division(clickable='' v-ripple='' v-for='pokeitem in pokeitems' :key='pokeitem.id' :to="`/pokemon/${pokeitem.id}`")
          q-item-section(side='')
            q-avatar(rounded='' size='60px')
              img(:src='pokeitem.sprites.front_default')
          q-item-section
            q-item-label
              strong {{pokeitem.name.toUpperCase()}}
            q-item-label(caption='') Peso: {{pokeitem.weight}}
      .text-center
        p Página atual: {{page + 1}}
        q-btn(outline rounded color="primary" @click="this.decrement" :disabled="prevPage") Página anterior
        q-btn(outline rounded color="primary" @click="this.increment" :disabled="nextPage") Página seguinte

</template>

<style lang="sass">
  .page
    width: 900px
    margin: auto
    max-width: 100%
    padding: 0 20px
  .content
    display: flex
    flex-wrap: wrap
    padding: 20px 0
    // justify-content: center
    .division
      width: 50%
      @media all and (max-width: 500px)
        width: 100%
      @media all and (min-width: 1200px)
        width: 33.33%
  .q-btn
    margin: 20px 5px
</style>

<script>

export default {
  name: 'Pokemons',
  components: {
    
  },
  data() {
    return {
      pokeitems: [],
      isLoading: true,
      page: 0,
      nextPage: true,
      prevPage: false,
      sorting: false,
    }
  },  
  mounted() {
    this.callService(0)
  },
  watch: {
    sorting: function(){

    }
  },
  methods: {
    callService(pageNumber){
      
      this.pokeitems = [];
      this.isLoading = true;

      this.axios.get(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${pageNumber*5}0`)
      .then((response) => {

        let nextButton = response.data.next;
        let prevButton = response.data.previous;

        this.nextPage = nextButton === null ? true : false;
        this.prevPage = prevButton === null ? true : false;
        
        let i = 0;
        const items = response.data.results;
        const itemsQuantity = items.length;


        items.forEach((element) => {

          this.axios.get(element.url)
          .then((response) => {

            this.pokeitems.push(response.data);

            if (i === itemsQuantity - 1) {

              // para de carregar
              this.isLoading = false;
            }

            i++;          
          })

        });
      }).catch((error)=>{
        console.log(error);
      }).finally(()=>{
        this.scrollUp()
      })
    },
    increment(){
      this.callService(this.page += 1)
    },
    decrement(){
      this.callService(this.page -= 1)
    },
    scrollUp(){
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera      
    },
    sortByNameInitials(){
      this.pokeitems.sort((a, b) => (a.name > b.name) ? 1 : -1)
    }
  },
}
</script>
