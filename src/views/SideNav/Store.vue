<template>
    <v-container>
        <v-row class="ml-3">
            <v-col cols="12">
                <v-btn @click="home">
                    <v-icon>mdi-home</v-icon>
                </v-btn>
                <v-btn @click="viewCart" class="ml-2">
                    <v-icon>mdi-cart</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <CartDialog v-if="CART_DIALOG" />
        <v-row>
            <v-col cols="6">
                <ProductTable/>
            </v-col>
            <v-col cols="6">
                <MAP_COMPONENT />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import MAP_COMPONENT from '../components/Map.vue';
import ProductTable from '../Tables/ProductTable.vue';
import CartDialog from '../Dialogs/CartDialog.vue';
import { mapGetters } from 'vuex';

export default {
    components: { MAP_COMPONENT, ProductTable, CartDialog },
    data() {
        return {
            circleRadius: 50
        }
    },
    methods: {
        viewCart() {
            this.$store.commit('CART_DIALOG', true)
        },
        home() {
            const latitude = this.USER_DETAILS.customer_locations.latitude
            const longitude = this.USER_DETAILS.customer_locations.longitude
            this.$store.commit("MARKER_LAT_LNG", [0, 0])
            this.$store.commit("CENTER", [0, 0])
            this.$store.commit("MARKER_LAT_LNG", [latitude, longitude])
            this.$store.commit("CENTER", [latitude, longitude])
            this.$store.commit("ZOOM", 19)
            this.$store.commit("SELECTED_USER_ROLE_DETAILS", "customerStore")
        },
        gps() {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        this.$store.commit("MARKER_LAT_LNG", [0, 0])
                        this.$store.commit("CENTER", [0, 0])
                        this.$store.commit("MARKER_LAT_LNG", [latitude, longitude])
                        this.$store.commit("CENTER", [latitude, longitude])
                        this.$store.commit("ZOOM", 19)
                        this.$store.commit("SELECTED_USER_ROLE_DETAILS", "customerStore")
                    },
                    (error) => {
                        if (error.code === 1) {
                            console.log('User denied geolocation access.'); // User chose "Block"
                        } else {
                            console.error('Error getting coordinates:', error);
                        }
                    }
                );
            } else {
                console.error('Geolocation is not supported in this browser.');
            }
        },
        registeredLocation() {
            const latitude = this.USER_DETAILS.customer_locations.latitude
            const longitude = this.USER_DETAILS.customer_locations.longitude
            this.$store.commit("MARKER_LAT_LNG", [0, 0])
            this.$store.commit("CENTER", [0, 0])
            this.$store.commit("MARKER_LAT_LNG", [latitude, longitude])
            this.$store.commit("CENTER", [latitude, longitude])
            this.$store.commit("ZOOM", 19)
            this.$store.commit("SELECTED_USER_ROLE_DETAILS", "customerStore")
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
            "CART_DIALOG"
        ]),

    },

    watch: {
        circleRadius: {
            handler(val) {
                this.$store.commit("CIRCLE_RADIUS", val)
            },
        }
    },

    created() {
        this.$store.dispatch('GetActiveStore').then((response) => {
            const latLngArr = response.map((item) => {
                return [item.latitude, item.longitude]
            })
            this.$store.commit('STORES_LAT_LNG', latLngArr)
        })
        this.$store.commit('PRODUCT_TABLE_VIEWER', 'STORE')
        this.$store.commit("PRODUCT", [])
    },
    mounted() {
        this.registeredLocation()
    }
}
</script>

<style scoped>
.img1 {
  position: absolute;
  left: 1000px;
  top: 400px;
  z-index: -1;
}

/* Add styling for the ProductTable to position it absolutely */
