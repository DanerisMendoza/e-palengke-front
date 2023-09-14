<template>
    <v-container>
            <l-map
            class="map-container"
            ref="map"
            style="height: 700px"
            :center="center"
            :zoom="zoom"
            @click="handleMarkerClick"
            >
            <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ></l-tile-layer>
            <l-marker
                v-if="MARKER_LAT_LNG!==null"
                :lat-lng="MARKER_LAT_LNG"
                :icon="computedMarker"
            ></l-marker>
            <l-circle
            v-if="MARKER_LAT_LNG!==null"
            :lat-lng="MARKER_LAT_LNG"
            :radius="circleRadius"
            :fill="true"
            :fill-opacity="0.2"
            :color="'rgb(242 159 19)'"
            style="cursor: move"
            ></l-circle>
        </l-map>
    </v-container>
  </template>
  
  <script>
  import { LMap, LTileLayer, LMarker, LIcon, LCircle,LTooltip, LPopup  } from 'vue2-leaflet';
  import 'leaflet/dist/leaflet.css';
  import { mapGetters } from 'vuex';
  import tambayMarker from '@/assets/markers/customerMarker.png';
  import sellerMarker from '@/assets/markers/sellerMarker2.png';

  export default {
    methods: {
        handleMarkerClick(event){
            const { lat, lng } = event.latlng;
            this.$store.commit("MARKER_LAT_LNG",[0,0])  
            this.$store.commit("CENTER",[0,0])  
            this.$store.commit("MARKER_LAT_LNG",[lat,lng])  
            this.$store.commit("CENTER",[lat,lng])  
        }
    },
  
    data() {
          return {
            center: [14.653341002411047,120.99472379571777],
            zoom: 7,
            circleRadius: 50*3,
            tambayMarker: L.icon({
                iconUrl: tambayMarker,
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
          };
      },
  
    mounted() {
        // console.log(this.CENTER)
        // console.log(this.ZOOM)
    },
  
    computed: {
      ...mapGetters([
        "CENTER",
        "ZOOM",
        "CIRCLE_RADIUS",
        "MARKER_LAT_LNG",
        "SELECTED_REQUIREMENT",
        "SELECTED_USER_ROLE_DETAILS"
      ]),
      
      computedMarker(){
        if(this.SELECTED_USER_ROLE_DETAILS === 3){
            return this.sellerMarker
        }
        else if(this.SELECTED_USER_ROLE_DETAILS === 4){
            return this.tambayMarker
        }
        else if(this.SELECTED_USER_ROLE_DETAILS === "customerStore"){
            return this.tambayMarker
        }
        else if(this.SELECTED_USER_ROLE_DETAILS === "customerRegistration"){
            return this.tambayMarker
        }
      }
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
            this.circleRadius = val*3
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
  }
  .l-tooltip-content {
    white-space: pre-line; /* Allow line breaks using \n */
  }
  </style>
  