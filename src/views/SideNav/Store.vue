<template>
  <v-app style="background: #d0dae3">
    <v-container>
      <v-card class="store">
        <h2 class="font-weight-bold mb-3">{{ $route.name }}</h2>

        <v-row>
          <v-col cols="12">
            <v-btn @click="home" color="success" dark class="float-right">
              <v-icon>mdi-home</v-icon>
            </v-btn>
            <v-btn
              @click="viewCart"
              color="orange"
              dark
              class="float-right mr-2"
            >
              <v-icon>mdi-cart</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <CartDialog v-if="CART_DIALOG" />

        <v-row>
          <v-col cols="12" sm="6">
            <ProductTable />
          </v-col>
          <v-col cols="12" sm="6">
            <MAP_COMPONENT :sidenavViewer="'store'" />
            <br />
            <v-slider v-model="circleRadius" class="mt-3" thumb-label="always">
              <template v-slot:thumb-label="{ value }">
                <div class="custom-thumb-label">{{ value }}</div>
              </template>
            </v-slider>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import MAP_COMPONENT from "../components/Map.vue";
import ProductTable from "../Tables/ProductTable.vue";
import CartDialog from "../Dialogs/CartDialog.vue";
import { mapGetters } from "vuex";

export default {
  components: { MAP_COMPONENT, ProductTable, CartDialog },
  data() {
    return {
      circleRadius: 50,
    };
  },
  methods: {
    viewCart() {
      this.$store.commit("CART_DIALOG", true);
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
    gps() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            this.$store.commit("MARKER_LAT_LNG", [0, 0]);
            this.$store.commit("CENTER", [0, 0]);
            this.$store.commit("MARKER_LAT_LNG", [latitude, longitude]);
            this.$store.commit("CENTER", [latitude, longitude]);
            this.$store.commit("ZOOM", 19);
            this.$store.commit("SELECTED_USER_ROLE_DETAILS", "customerStore");
          },
          (error) => {
            if (error.code === 1) {
              console.log("User denied geolocation access."); // User chose "Block"
            } else {
              console.error("Error getting coordinates:", error);
            }
          }
        );
      } else {
        console.error("Geolocation is not supported in this browser.");
      }
    },
    registeredLocation() {
      const latitude = this.USER_DETAILS.customer_locations.latitude;
      const longitude = this.USER_DETAILS.customer_locations.longitude;
      this.$store.commit("MARKER_LAT_LNG", [0, 0]);
      this.$store.commit("CENTER", [0, 0]);
      this.$store.commit("MARKER_LAT_LNG", [latitude, longitude]);
      this.$store.commit("CENTER", [latitude, longitude]);
      this.$store.commit("ZOOM", 19);
    },
  },

  computed: {
    ...mapGetters([
      "CENTER",
      "ZOOM",
      "CIRCLE_RADIUS",
      "MARKER_LAT_LNG",
      "SELECTED_USER_ROLE_DETAILS",
      "STORES",
      "STORES_LAT_LNG",
      "USER_DETAILS",
      "CART_DIALOG",
    ]),
  },

  watch: {
    circleRadius: {
      handler(val) {
        this.$store.commit("CIRCLE_RADIUS", val * 3);
      },
    },
  },

  created() {
    this.$store.dispatch("GetActiveStore").then((response) => {
      const latLngArr = response.map((item) => {
        return [item.latitude, item.longitude];
      });
      this.$store.commit("STORES_LAT_LNG", latLngArr);
    });
    this.$store.commit("PRODUCT_TABLE_VIEWER", "STORE");
    this.$store.commit("PRODUCT", []);
  },
  mounted() {
    this.registeredLocation();
  },
};
</script>

<style scoped>
.img1 {
  position: absolute;
  left: 1000px;
  top: 400px;
  z-index: -1;
}
.custom-thumb-label {
  max-width: 60px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: black;
}
.store {
  border-top: 5px solid #1976d2;
  padding: 1rem;
}
</style>
