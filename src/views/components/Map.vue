<template>
  <l-map class="map-container" ref="map" :style="{ 'height': sidenavViewer === 'store' ? '90%' : '400px', 'z-index': 1 }"
    :center="center" :zoom="zoom" @click="handleMarkerClick" :options="mapOptions">


    <div v-if="sidenavViewer === 'store'">
      <v-btn @click="home" color="success" dark class="float-right buttons mt-1 mr-1">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn @click="viewCart" color="orange" dark class="float-right mr-2 buttons mt-1 mr-1">
        <v-icon>mdi-cart</v-icon>
      </v-btn>
    </div>

    <div v-if="sidenavViewer === 'store'" style="position: absolute; bottom: 0px; left: 42%; z-index: 402; ">
      <v-card style="width: 200px; ">
        <v-slider v-model="circleRadiusOrigin" thumb-label="always" hide-details @mousedown.stop></v-slider>
      </v-card>
    </div>

    <v-navigation-drawer :absolute="SIDE_NAV_TOGGLE" :app="(!SIDE_NAV_TOGGLE)" v-if="sidenavViewer === 'store' && drawer"
      :class="{ 'mt-4': !SIDE_NAV_TOGGLE }" class="drawer" v-model="drawer">
      <template>
        <v-navigation-drawer>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h7">
                {{ SELECTED_STORE.name }}
              </v-list-item-title>
            </v-list-item-content>
            <v-btn icon @click="closeDrawer" class="float-right">
              <v-icon>mdi-keyboard-backspace</v-icon>
            </v-btn>
          </v-list-item>
          <v-divider></v-divider>

          <v-list dense nav>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-map-marker-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                {{ SELECTED_STORE.address }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-phone</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                {{ SELECTED_STORE.storeOwner.phone_number }}
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-storefront</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-chip v-for="(detail, index) in SELECTED_STORE.store_type_details" :key="index" class="mr-2"
                  style="font-size: smaller;">
                  {{ detail.name }}
                </v-chip>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-clock-time-four-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                Store Opening and Closing
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                Monday {{ SELECTED_STORE.monday == null ? 'unavailable' : SELECTED_STORE.monday }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                Tuesday {{ SELECTED_STORE.tuesday == null ? 'unavailable' : SELECTED_STORE.tuesday }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                Wednesday {{ SELECTED_STORE.wednesday == null ? 'unavailable' : SELECTED_STORE.wednesday }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                Thursday {{ SELECTED_STORE.thursday == null ? 'unavailable' : SELECTED_STORE.thursday }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                Friday {{ SELECTED_STORE.friday == null ? 'unavailable' : SELECTED_STORE.friday }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                Saturday {{ SELECTED_STORE.saturday == null ? 'unavailable' : SELECTED_STORE.saturday }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                Sunday {{ SELECTED_STORE.sunday == null ? 'unavailable' : SELECTED_STORE.sunday }}
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item link>
              <v-list-item-content>
                <v-btn @click="OpenProductTable" dark>
                  View Menu
                </v-btn>
              </v-list-item-content>
            </v-list-item>

          </v-list>

        </v-navigation-drawer>
      </template>
    </v-navigation-drawer>

    <!-- <l-control-zoom class="custom-zoom-control"></l-control-zoom> -->
    <l-tile-layer :url="googleStreets.url" :maxZoom="googleStreets.maxZoom"
      :subdomains="googleStreets.subdomains"></l-tile-layer>
    <!-- current marker(dynamic icon) -->
    <l-marker v-if="MARKER_LAT_LNG !== null" :lat-lng="MARKER_LAT_LNG" :icon="computedMarker"></l-marker>

    <!-- multiple marker(stores) -->
    <l-marker v-if="sidenavViewer === 'store'" v-for="(item, index) in storeMarkersInsideCircle" ref="markers"
      :key="index" :lat-lng="item" :icon="isMarkerSelected(item)" @click="go(item)">
    </l-marker>

    <!-- delivery -->
    <!-- <l-marker v-if="sidenavViewer === 'delivery'" v-for="(item, index) in USER_INSIDE_RADIUS" ref="markers"
        :key="index" :lat-lng="{ lat: item.latitude, lng: item.longitude}" :icon="personMarker" >
      </l-marker> -->
    <l-marker v-if="sidenavViewer === 'delivery' && TRANSACTION.length != 0"
      :lat-lng="{ lat: TRANSACTION[0].latitude, lng: TRANSACTION[0].longitude }" :icon="personMarker"></l-marker>
    <l-marker v-if="sidenavViewer === 'delivery' && TRANSACTION.length != 0" v-for="(item, index) in ORDER_STORE_LAT_LNG"
      ref="markers" :key="index" :lat-lng="{ lat: item.latitude, lng: item.longitude }" :icon="sellerMarker">
    </l-marker>

    <!-- radius -->
    <l-circle v-if="MARKER_LAT_LNG !== null" :lat-lng="MARKER_LAT_LNG" :radius="circleRadius" :fill="true"
      :fill-opacity="0.2" :color="'rgb(25,118,210)'" style="cursor: move"></l-circle>


  </l-map>
</template>
  
<script>
import { LMap, LTileLayer, LMarker, LIcon, LCircle, LTooltip, LPopup, LControlZoom } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import { mapGetters } from 'vuex';
import selectedMarker from '@/assets/markers/selectedMarker.png';
import personMarker from '@/assets/markers/customerMarker.png';
import sellerMarker from '@/assets/markers/sellerMarker2.png';
import deliveryMarker from '@/assets/markers/deliveryMarker2.png';
import ProductTable from "../Tables/ProductTable.vue";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

export default {


  methods: {
    isMarkerSelected(marker) {
      return marker === this.pin ? this.selectedMarker : this.sellerMarker;
    },

    home() {
      const latitude = this.USER_DETAILS.customer_locations.latitude;
      const longitude = this.USER_DETAILS.customer_locations.longitude;
      this.$store.commit("MARKER_LAT_LNG", [0, 0]);
      this.$store.commit("CENTER", [0, 0]);
      this.$store.commit("MARKER_LAT_LNG", [latitude, longitude]);
      this.$store.commit("CENTER", [latitude, longitude]);
      this.$store.commit("ZOOM", 19);
      this.$store.commit("SELECTED_USER_ROLE_DETAILS", "customerStore");
    },
    viewCart() {
      this.$store.commit("CART_DIALOG", true);
    },
    OpenProductTable() {
      this.$store.commit('PRODUCT_CUSTOMER_VIEW_DIALOG', true)
    },
    handlePopupClose() {
      // this.drawer = false
      this.OldCoordinates = null
      if (this.routingControl != null) {
        this.$refs.map.mapObject.removeControl(this.routingControl);
      }
    },
    closeDrawer() {
      this.drawer = false
      if (this.routingControl != null) {
        this.$refs.map.mapObject.removeControl(this.routingControl);
      }
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
      this.pin = item;
      const matchingBranch = this.STORES.find((branch) => {
        return branch.latitude === item[0] && branch.longitude === item[1];
      });
      this.$store.commit('SELECTED_STORE', matchingBranch)
      this.drawer = true

      if (this.OldCoordinates == matchingBranch) {
        this.OldCoordinates = null
        return
      }

      if (this.routingControl != null) {
        this.$refs.map.mapObject.removeControl(this.routingControl);
      }
      this.routingControl = new L.Routing.control({
        waypoints: [
          L.latLng(this.MARKER_LAT_LNG), // Example waypoint
          L.latLng(matchingBranch.latitude, matchingBranch.longitude), // Add more waypoints as needed
        ],
        lineOptions: {
          styles: [{ color: 'blue', opacity: 0.7, weight: 5 }]
        },
        createMarker: function () { return null; },
        fitSelectedRoutes: false,
      }).addTo(this.$refs.map.mapObject); // Assuming your map element has a ref named "map"
      this.OldCoordinates = matchingBranch


    },
    getTooltipContent(item) {
      const matchingBranch = this.STORES.find((branch) => {
        return branch.latitude === item[0] && branch.longitude === item[1];
      });
      let details = `
            <div>
            <center><strong style='color:#eb8f34;'>${matchingBranch.name}</strong></center>
            <center><style='color:#eb8f34;'>
          `;
      // for (let i = 0; i < matchingBranch.store_type_details.length; i++) {
      //   if (i == matchingBranch.store_type_details.length - 1) {
      //     details += `${matchingBranch.store_type_details[i].name}`;
      //   }
      //   else {
      //     details += `${matchingBranch.store_type_details[i].name},`;
      //   }
      // }
      details += `</center></div>`
      return details
    },
  },

  props: {
    sidenavViewer: String
  },

  data() {
    return {
      pin: null,
      googleStreets: {
        url: 'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      },
      mapOptions: {
        zoomControl: false, // Disable the default zoom control
      },
      OldCoordinates: null,
      routingControl: null,
      drawer: false,
      center: [14.653341002411047, 120.99472379571777],
      zoom: 7,
      circleRadius: 50 * 3,
      circleRadiusOrigin: 50,
      selectedMarker: L.icon({
        iconUrl: selectedMarker,
        iconSize: [25, 41],
        iconAnchor: [10, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
      }),
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
      "USER_DETAILS",
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
      "SIDE_NAV_TOGGLE"
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
    SELECTED_STORE: {
      handler(val) {
        console.log(val)
      },
    },
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

    circleRadiusOrigin: {
      handler(val) {
        this.$store.commit("CIRCLE_RADIUS", val * 3);
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
.l-tooltip-content {
  white-space: pre-line;
  /* Allow line breaks using \n */
}

.leaflet-routing-container {
  top: 40px;
  /*added by me */

  transition: margin-right 0.2s ease;
  /* display: none !important; */
}

.drawer,
.buttons {
  z-index: 401;
}
.leaflet-control-attribution.leaflet-control {
    display: none;
}
</style>
  