<template lang="pug">
  .page
    h4.text-center Location
    .text-center(v-if='isLoading')
      q-spinner-ios(color='primary' size='2em')
    .wrapper(v-if='!isLoading') 
      .content
        q-item.division(clickable='' v-ripple='' v-for='region in regions' :key='region.id')
          p {{region.name}}
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
  name: 'Location',
  components: {
    
  },
  data() {
    return {
      regions: [],
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
      if(this.sorting){
        this.sortByNameInitials()
      } else {
        this.regions.sort( () => Math.random() - 0.5) 
      }
    }
  },
  methods: {
    callService(pageNumber){
      
      this.regions = [];
      this.isLoading = true;

      this.axios.get(`https://pokeapi.co/api/v2/region?offset=${pageNumber*5}0&limit=20`)
      // this.axios.get(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${pageNumber*5}0`)
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
            
            this.regions.push(response.data);

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
      this.regions.sort((a, b) => (a.name > b.name) ? 1 : -1)
    }
  },
}
</script>
