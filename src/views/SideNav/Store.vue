<template>
    <v-container>
        <v-row class="ml-5">
            <v-col cols="4" >
                <v-btn @click="home">
                    <v-icon >mdi-home</v-icon>
                </v-btn>
                <v-btn @click="viewCart">
                    <v-icon >mdi-cart</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <CartDialog v-if="CART"/>
        <v-row>
            <v-col cols="6">
                <MAP_COMPONENT/>
            </v-col>
            <v-col cols="6">
                <ProductTable/>
            </v-col>
            <v-row>
                <v-col cols="6">
                    <v-slider
                        v-model="circleRadius"
                        thumb-label="always"
                        class="mt-3"
                    ></v-slider>
                </v-col>
            </v-row>
        </v-row>
    </v-container>
</template>

<script>
    import MAP_COMPONENT from '../components/Map.vue';
    import ProductTable from '../Tables/ProductTable.vue';
    import CartDialog from '../Dialogs/CartDialog.vue';
    import { mapGetters } from 'vuex';

    export default{
        components: { MAP_COMPONENT,ProductTable,CartDialog},
        data(){
            return {
                circleRadius: 50
            }
        },  
        methods:{
            viewCart(){
                this.$store.commit('CART',true)
            },
            home(){
                const latitude = this.USER_DETAILS.latitude
                const longitude = this.USER_DETAILS.longitude
                this.$store.commit("MARKER_LAT_LNG",[0,0])  
                this.$store.commit("CENTER",[0,0])  
                this.$store.commit("MARKER_LAT_LNG",[latitude,longitude])  
                this.$store.commit("CENTER",[latitude,longitude])  
                this.$store.commit("ZOOM",19)  
                this.$store.commit("SELECTED_USER_ROLE_DETAILS","customerStore")  
            },
            gps(){
                if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    this.$store.commit("MARKER_LAT_LNG",[0,0])  
                    this.$store.commit("CENTER",[0,0])  
                    this.$store.commit("MARKER_LAT_LNG",[latitude,longitude])  
                    this.$store.commit("CENTER",[latitude,longitude])  
                    this.$store.commit("ZOOM",19)  
                    this.$store.commit("SELECTED_USER_ROLE_DETAILS","customerStore")  
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
            registeredLocation(){
                const latitude = this.USER_DETAILS.latitude
                const longitude = this.USER_DETAILS.longitude
                this.$store.commit("MARKER_LAT_LNG",[0,0])  
                this.$store.commit("CENTER",[0,0])  
                this.$store.commit("MARKER_LAT_LNG",[latitude,longitude])  
                this.$store.commit("CENTER",[latitude,longitude])  
                this.$store.commit("ZOOM",19)  
                this.$store.commit("SELECTED_USER_ROLE_DETAILS","customerStore")  
            }
        },

        computed: {
        ...mapGetters([
            "CENTER",
            "ZOOM",
            "CIRCLE_RADIUS",
            "MARKER_LAT_LNG",
            "SELECTED_REQUIREMENT",
            "SELECTED_USER_ROLE_DETAILS",
            "STORES",
            "STORES_LAT_LNG",
            "USER_DETAILS",
            "CART"
        ]),
        
        },
        
        watch: {
            circleRadius: {
                handler(val) {
                    this.$store.commit("CIRCLE_RADIUS",val)  
                },
            }
        },
        
        created(){
            this.$store.dispatch('GetActiveStore').then((response)=>{
                console.log(response)
                const latLngArr = response.map((item)=>{
                    return [item.latitude,item.longitude]
                })
                this.$store.commit('STORES_LAT_LNG',latLngArr)
            })
            this.$store.commit('PRODUCT_TABLE_VIEWER','STORE')
            this.$store.commit("PRODUCT", [])
        },
        mounted(){
            this.registeredLocation()
        }
    }
</script>