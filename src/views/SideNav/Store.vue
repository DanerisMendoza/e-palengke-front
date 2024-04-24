<template>
  <v-app style="background: #c8e0f6">
    <div class="page-title">
      <p class="text-h4">Store</p>
    </div>

    <CartDialog v-if="CART_DIALOG" />
    <ProductCustomerViewDialog v-if="PRODUCT_CUSTOMER_VIEW_DIALOG" />
    <MAP_COMPONENT :sidenavViewer="'store'" />
  </v-app>
</template>

<script>
import MAP_COMPONENT from "../components/Map.vue";
import ProductTable from "../Tables/ProductTable.vue";
import CartDialog from "../Dialogs/CartDialog.vue";
import ProductCustomerViewDialog from "../Dialogs/ProductCustomerViewDialog.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    MAP_COMPONENT,
    ProductTable,
    CartDialog,
    ProductCustomerViewDialog,
  },
  data() {
    return {
      circleRadius: 50,
      drawer: true,
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
      this.$store.commit("ZOOM", 17);
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
      "PRODUCT_CUSTOMER_VIEW_DIALOG",
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
/* .img1 {
  position: absolute;
  left: 1000px;
  top: 400px;
  z-index: -1;
} */

/* .custom-thumb-label {
  max-width: 60px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: black;
} */

/* .store {
  border-top: 5px solid #1976d2;
  padding: 1rem;
} */

.page-title p {
  margin-bottom: 1rem;
  color: #0c3a68;
  padding: 0 2.5rem 0;
}
</style>
