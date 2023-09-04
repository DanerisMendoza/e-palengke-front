<template>
    <v-container>
        <h1>Application Window</h1>
        <v-row>
            <v-col cols="12">
                <Application/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <h1>{{ computedRole }}</h1>
            </v-col>
            <v-col cols="6">
                <v-btn v-if="SELECTED_REQUIREMENT!==null" @click="gps" class="float-right">GPS</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <MAP_COMPONENT v-if="SELECTED_REQUIREMENT!==null"/>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    import { mapGetters } from 'vuex';
    import Application from '../components/Application.vue';
    import MAP_COMPONENT from '../components/Map.vue';
export default{
    components: { Application,MAP_COMPONENT},
    computed: {
      ...mapGetters([
        "SELECTED_REQUIREMENT",
      ]),

      computedRole(){
        if(this.SELECTED_REQUIREMENT === null){
            return ""
        }
        else if(this.SELECTED_REQUIREMENT === 1){
            return "SELECT YOUR MARKET SPOT"
        }
        else if(this.SELECTED_REQUIREMENT === 2){
            return "SELECT YOUR TAMBAY SPOT"
        }
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
                // console.log(latitude,longitude)
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
        }
    }
}
</script>