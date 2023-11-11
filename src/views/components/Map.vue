<template>
  <v-container>
    <l-map class="map-container" ref="map" style="height: 300px" :center="center" :zoom="zoom" @click="handleMarkerClick">
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
      <!-- current marker(dynamic icon) -->
      <l-marker v-if="MARKER_LAT_LNG !== null" :lat-lng="MARKER_LAT_LNG" :icon="computedMarker"></l-marker>
      <!-- multiple marker(stores) -->
      <l-marker v-if="sidenavViewer === 'store'" v-for="(item, index) in storeMarkersInsideCircle" ref="markers"
        :key="index" :lat-lng="item" :icon="sellerMarker" @click="go(item)">
        <!-- stores tooltip info -->
        <l-popup :content="getTooltipContent(item)"></l-popup>
      </l-marker>
      <!-- radius -->
      <l-circle v-if="MARKER_LAT_LNG !== null" :lat-lng="MARKER_LAT_LNG" :radius="circleRadius" :fill="true"
        :fill-opacity="0.2" :color="'rgb(242 159 19)'" style="cursor: move"></l-circle>

    </l-map>
  </v-container>
</template>
  
<script>
import { LMap, LTileLayer, LMarker, LIcon, LCircle, LTooltip, LPopup } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import { mapGetters } from 'vuex';
import personMarker from '@/assets/markers/customerMarker.png';
import sellerMarker from '@/assets/markers/sellerMarker2.png';
import deliveryMarker from '@/assets/markers/deliveryMarker2.png';

export default {
  methods: {
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
    console.log(this.sidenavViewer)
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

    CIRCLE_RADIUS: {
      handler(val) {
        this.circleRadius = val * 3
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
    LPopup
  },

};
</script>
  
<style>
.map-container {
  position: relative;
  z-index: 1;
  border: 1px solid #000;
  /* Add your desired border styles here */
  border-radius: 10px;
  /* Optional: Add border radius */
}

.l-tooltip-content {
  white-space: pre-line;
  /* Allow line breaks using \n */
}
</style>
  