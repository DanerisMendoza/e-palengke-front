import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify'; // Import Vuetify
import 'vuetify/dist/vuetify.min.css'; // Import Vuetify CSS
import router from './router'; // Import the router configuration
import store from './store'
import Swal from 'sweetalert2';
import { LMap, LTileLayer } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';


Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.use(Vuetify);
Vue.prototype.$swal = Swal;

const vuetify = new Vuetify(); // Initialize Vuetify

new Vue({
  el: '#app',
  store,
  router, // Use the router
  vuetify, // Use Vuetify
  render: (h) => h(App),
});
