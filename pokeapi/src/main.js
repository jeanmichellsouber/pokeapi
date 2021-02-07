import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import './quasar'
import router from './router'


Vue.config.productionTip = false
Vue.use(VueAxios, axios)

// const BASE_URL = 'https://pokeapi.co/api/v2/';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
