import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify'; // Import Vuetify
import 'vuetify/dist/vuetify.min.css'; // Import Vuetify CSS
import router from './router'; // Import the router configuration
import store from './store'
import Swal from 'sweetalert2';
import { LMap, LTileLayer } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'; // Import the CSS file
import 'leaflet-routing-machine/dist/leaflet-routing-machine'; // Import the JavaScript file
import VueApexCharts from 'vue-apexcharts'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

// pusher only
Vue.prototype.$Pusher = new Pusher('352de43b53541443acec', { cluster: 'ap1' });

// localhost websockets
// Vue.prototype.$Echo = new Echo({
//   broadcaster: 'pusher',
//   key: 'e_palengke_key',
//   wsHost: '192.168.1.4',
//   wsPort: 6001,
//   forceTLS: false,
//   disableStats: true,
//   cluster: 'mt1'
// })


Vue.component('apexchart', VueApexCharts)
Vue.use(VueApexCharts)
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
