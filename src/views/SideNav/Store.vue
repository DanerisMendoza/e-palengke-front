<template>
    <v-container>
        <h1>STORE PAGE</h1>
        <v-row>
            <v-col cols="12">
                <MAP_COMPONENT/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-slider
                    v-model="circleRadius"
                    thumb-label="always"
                ></v-slider>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import MAP_COMPONENT from '../components/Map.vue';
    import { mapGetters } from 'vuex';

    export default{
        components: { MAP_COMPONENT},
        data(){
            return {
                circleRadius: 50
            }
        },  
        methods:{
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
        ]),
        
        },
        
        watch: {
            circleRadius: {
                handler(val) {
                    this.$store.commit("CIRCLE_RADIUS",val)  
                },
            }
        },
        
        mounted(){
            this.$store.dispatch('GetActiveStore').then((response)=>{
                console.log(response)
                const latLngArr = response.map((item)=>{
                    return [item.latitude,item.longitude]
                })
                this.$store.commit('STORES_LAT_LNG',latLngArr)
            })
            // this.gps()
            this.registeredLocation()
        }
    }
</script>