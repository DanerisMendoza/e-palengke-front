<template>
  <v-container>

    <l-map class="map-container" ref="map" style="height: 400px;   z-index: 1;" :center="center" :zoom="zoom"
      @click="handleMarkerClick" :options="mapOptions">

      <v-navigation-drawer v-if="sidenavViewer === 'store' && drawer" class="drawer" v-model="drawer" absolute>
        <v-row>
          <v-col cols="12">
            <v-btn icon @click="closeDrawer" class="float-right">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols=12>
            <v-divider></v-divider>
            <center>
              <h1>STORE INFORMATION</h1>
            </center>
          </v-col>
        </v-row>
        <v-row>
          <v-col col="12">
            <v-divider></v-divider>
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td class="font-weight-bold">Name:</td>
                    <td>{{ SELECTED_STORE.name }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">Address:</td>
                    <td>{{ SELECTED_STORE.address }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">Contact:</td>
                    <td>{{ SELECTED_STORE.storeOwner.phone_number }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">Store Type Details:</td>
                    <td>
                      <v-chip v-for="(detail, index) in SELECTED_STORE.store_type_details" :key="index" class="mr-2"
                        style="font-size: smaller;">
                        {{ detail.name }}
                      </v-chip>
                    </td>
                  </tr>
                  <v-divider></v-divider>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <center>
              <v-btn icon @click="OpenProductTable">
                <v-icon>mdi-store</v-icon>
              </v-btn>
            </center>
          </v-col>
        </v-row>
      </v-navigation-drawer>

      <l-control-zoom class="custom-zoom-control"></l-control-zoom>
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>

      <!-- current marker(dynamic icon) -->
      <l-marker v-if="MARKER_LAT_LNG !== null" :lat-lng="MARKER_LAT_LNG" :icon="computedMarker"></l-marker>

      <!-- multiple marker(stores) -->
      <l-marker v-if="sidenavViewer === 'store'" v-for="(item, index) in storeMarkersInsideCircle" ref="markers"
        :key="index" :lat-lng="item" :icon="sellerMarker" @click="go(item)">
        <!-- stores tooltip info -->
        <l-popup :content="getTooltipContent(item)"></l-popup>
      </l-marker>

      <!-- delivery -->
      <!-- <l-marker v-if="sidenavViewer === 'delivery'" v-for="(item, index) in USER_INSIDE_RADIUS" ref="markers"
        :key="index" :lat-lng="{ lat: item.latitude, lng: item.longitude}" :icon="personMarker" >
      </l-marker> -->
      <l-marker v-if="sidenavViewer === 'delivery' && TRANSACTION.length != 0"
        :lat-lng="{ lat: TRANSACTION[0].latitude, lng: TRANSACTION[0].longitude }" :icon="personMarker"></l-marker>
      <l-marker v-if="sidenavViewer === 'delivery' && TRANSACTION.length != 0"
        v-for="(item, index) in ORDER_STORE_LAT_LNG" ref="markers" :key="index"
        :lat-lng="{ lat: item.latitude, lng: item.longitude }" :icon="sellerMarker">
      </l-marker>

      <!-- radius -->
      <l-circle v-if="MARKER_LAT_LNG !== null" :lat-lng="MARKER_LAT_LNG" :radius="circleRadius" :fill="true"
        :fill-opacity="0.2" :color="'rgb(242 159 19)'" style="cursor: move"></l-circle>
    </l-map>
  </v-container>
</template>
  
<script>
import { LMap, LTileLayer, LMarker, LIcon, LCircle, LTooltip, LPopup, LControlZoom } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import { mapGetters } from 'vuex';
import personMarker from '@/assets/markers/customerMarker.png';
import sellerMarker from '@/assets/markers/sellerMarker2.png';
import deliveryMarker from '@/assets/markers/deliveryMarker2.png';
import ProductTable from "../Tables/ProductTable.vue";


export default {
  methods: {
    OpenProductTable(){
      this.$store.commit('PRODUCT_CUSTOMER_VIEW_DIALOG',true)
    },
    closeDrawer() {
      this.drawer = false
    },
    handleMarkerClick(event) {
      if (this.sidenavViewer == 'application' || this.sidenavViewer == 'registration') {
        const { lat, lng } = event.latlng;
        this.$store.commit("MARKER_LAT_LNG", [0, 0])
        this.$store.commit("CENTER", [0, 0])
        this.$store.commit("MARKER_LAT_LNG", [lat, lng])
        this.$store.commit("CENTER", [lat, lng])
        this.$store.commit("ZOOM", 19)
      }
    },
    go(item) {
      const matchingBranch = this.STORES.find((branch) => {
        return branch.latitude === item[0] && branch.longitude === item[1];
      });
      this.$store.commit('SELECTED_STORE', matchingBranch)
      console.log(this.STORES)
      this.drawer = true
    },
    getTooltipContent(item) {
      const matchingBranch = this.STORES.find((branch) => {
        return branch.latitude === item[0] && branch.longitude === item[1];
      });
      let details = `
            <div>
            <center><strong style='color:#eb8f34;'>${matchingBranch.name}</strong></center><br>
            <center><style='color:#eb8f34;'>
          `;
      for (let i = 0; i < matchingBranch.store_type_details.length; i++) {
        if (i == matchingBranch.store_type_details.length - 1) {
          details += `${matchingBranch.store_type_details[i].name}`;
        }
        else {
          details += `${matchingBranch.store_type_details[i].name},`;
        }
      }
      details += `</center></div>`
      return details
    },
  },

  props: {
    sidenavViewer: String
  },

  data() {
    return {
      mapOptions: {
        zoomControl: false, // Disable the default zoom control
      },
      drawer: false,
      center: [14.653341002411047, 120.99472379571777],
      zoom: 7,
      circleRadius: 50 * 3,
      personMarker: L.icon({
        iconUrl: personMarker,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
      }),
      sellerMarker: L.icon({
        iconUrl: sellerMarker,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
      }),
      deliveryMarker: L.icon({
        iconUrl: deliveryMarker,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
      }),
    };
  },

  mounted() {
    // console.log(this.STORES)
    // console.log(this.ZOOM)
    // console.log(this.sidenavViewer)
  },

  computed: {
    ...mapGetters([
      "CENTER",
      "ZOOM",
      "CIRCLE_RADIUS",
      "MARKER_LAT_LNG",
      "SELECTED_REQUIREMENT",
      "SELECTED_USER_ROLE_DETAILS",
      "STORES_LAT_LNG",
      "STORES",
      "USER_INSIDE_RADIUS",
      "TRANSACTION",
      "ORDER_STORE_LAT_LNG",
      "SELECTED_STORE",
    ]),

    computedMarker() {
      if (this.sidenavViewer === 'store') {
        return this.personMarker
      }
      else if (this.sidenavViewer === 'application') {
        if (this.SELECTED_USER_ROLE_DETAILS === 3) {
          return this.sellerMarker
        }
        else if (this.SELECTED_USER_ROLE_DETAILS === 4) {
          return this.deliveryMarker
        }
      }
      else if (this.sidenavViewer === 'registration') {
        return this.personMarker
      }
      else if (this.sidenavViewer === 'delivery') {
        return this.deliveryMarker
      }
    },

    storeMarkersInsideCircle() {
      return this.STORES_LAT_LNG.filter(marker => {
        const distance = L.latLng(marker).distanceTo(L.latLng(this.MARKER_LAT_LNG));
        return distance <= this.circleRadius;
      });
    },
  },

  watch: {
    MARKER_LAT_LNG: {
      handler(val) {
        // console.log(val)
        this.center = this.CENTER;
        this.zoom = this.ZOOM;
        this.$refs.map.mapObject.setView(this.center, this.zoom);
      },
    },

    ORDER_STORE_LAT_LNG: {
      handler(val) {
        // console.log(val)
      },
    },
    CIRCLE_RADIUS: {
      handler(val) {
        this.circleRadius = val
      },
    },
    STORES_LAT_LNG: {
      handler(val) {
        // console.log(this.STORES_LAT_LNG)
      },
    }
  },

  components: {
    LMap,
    LTileLayer,
    LMarker,
    LCircle,
    LTooltip,
    LPopup,
    LControlZoom,
    ProductTable,
  },

};
</script>
  
<style>
.map-container {
  /* position: absolute; */

  border: 1px solid #000;
  /* Add your desired border styles here */
  /* border-radius: 10px; */
  /* Optional: Add border radius */
}

.l-tooltip-content {
  white-space: pre-line;
  /* Allow line breaks using \n */
}

.drawer {
  z-index: 401;
}
</style>
  