<template>
    <!-- <div> -->
    <v-app>

        <!-- <v-container> -->
            <!-- <v-card class="store"> -->

                <!-- <v-row>
                    <v-col cols="2">
                        <h2 class="font-weight-bold mb-3">{{ $route.name }}</h2>
                    </v-col>
                    <v-col cols="10">
                        <v-btn @click="home" color="success" dark class="float-right">
                            <v-icon>mdi-home</v-icon>
                        </v-btn>
                        <v-btn @click="viewCart" color="orange" dark class="float-right mr-2">
                            <v-icon>mdi-cart</v-icon>
                        </v-btn>
                    </v-col>
                </v-row> -->

                <CartDialog v-if="CART_DIALOG" />
                <ProductCustomerViewDialog v-if="PRODUCT_CUSTOMER_VIEW_DIALOG" />
                <MAP_COMPONENT :sidenavViewer="'store'" />
                <!-- <v-slider v-model="circleRadius" class="mt-3 transparent-slider" thumb-label="always"></v-slider> -->

            <!-- </v-card> -->
        <!-- </v-container> -->
    </v-app>
    <!-- </div> -->
</template>

<script>
import MAP_COMPONENT from "../components/Map.vue";
import ProductTable from "../Tables/ProductTable.vue";
import CartDialog from "../Dialogs/CartDialog.vue";
import ProductCustomerViewDialog from "../Dialogs/ProductCustomerViewDialog.vue";
import { mapGetters } from "vuex";

export default {
    components: { MAP_COMPONENT, ProductTable, CartDialog, ProductCustomerViewDialog },
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
            const latitude = this.USER_DETAILS.customer_locations.latitude
            const longitude = this.USER_DETAILS.customer_locations.longitude
            this.$store.commit("MARKER_LAT_LNG", [0, 0])
            this.$store.commit("CENTER", [0, 0])
            this.$store.commit("MARKER_LAT_LNG", [latitude, longitude])
            this.$store.commit("CENTER", [latitude, longitude])
            this.$store.commit("ZOOM", 17)
        }
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

.drawer {
    /* position: absolute;
    z-index: 90; */
}

</style>
