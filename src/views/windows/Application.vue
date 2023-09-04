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
        <v-row v-if="SELECTED_REQUIREMENT === 1">
            <v-col cols="6" class="mt-2">
                <v-text-field v-model="storeName" label="Enter Your Store Name:"></v-text-field>
            </v-col>
            <v-col cols="6">
                <v-autocomplete
                    v-model="selected_store_type_detail"
                    :items="STORE_TYPE_DETAIL"
                    item-text="name"
                    item-value="id"
                    label="SELECT STORE TYPE"
                    auto-select-first
                    chips
                    multiple
                    deletable-chips
                ></v-autocomplete>
            </v-col>
        </v-row>
        <v-row v-if="SELECTED_REQUIREMENT!==null">
            <v-col cols="12">
                <v-btn class="float-right" @click="submit">submit</v-btn>
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
        "STORE_TYPE_DETAIL",
        "APPLICANT_CREDENTIALS",
        "MARKER_LAT_LNG"
      ]),

      computedRole(){
        if(this.SELECTED_REQUIREMENT === null){
            return ""
        }
        else if(this.SELECTED_REQUIREMENT === 1){
            return "SELECT YOUR MARKET LOCATION"
        }
        else if(this.SELECTED_REQUIREMENT === 2){
            return "SELECT YOUR TAMBAY LOCATION"
        }
      }
    },

    data(){
        return{
            selected_store_type_detail: null,
            storeName: null
        }
      },

    methods:{
        submit(){
            // console.log(this.APPLICANT_CREDENTIALS)
            let isCredentialComplete = this.APPLICANT_CREDENTIALS.length === 0 ? false : true 
            this.APPLICANT_CREDENTIALS.forEach(item => {
                if (!item.hasOwnProperty('value')) {
                    isCredentialComplete = false
                } 
                else if(item.value === null){
                    isCredentialComplete = false
                }
            });
            if(!isCredentialComplete){
                alert("Please Complete Credential");
                return
            }
            if(this.MARKER_LAT_LNG === null){
                alert("Please Select Location");
                return
            }
            if(this.SELECTED_REQUIREMENT === 1){
                const data = new FormData();
                // data.append("form", JSON.stringify(this.form));
                if (this.APPLICANT_CREDENTIALS.length > 0) {
                    for (let i = 0; i < this.APPLICANT_CREDENTIALS.length; i++) {
                        data.append("files[]", this.APPLICANT_CREDENTIALS[i].value);
                        console.log(this.APPLICANT_CREDENTIALS[i].value)
                    }
                }


                // const data = {
                //     applicantCredential: this.APPLICANT_CREDENTIALS,
                //     storeName: this.storeName,
                //     storeType: this.selected_store_type_detail,
                //     user_id: 2
                // }
                const config = {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                };

                const payload = {
                    params: data,
                    config: config,
                };

                // console.log(payload)
                this.$store.dispatch("SUBMIT_APPLICANT_CREDENTIAL",payload)  
            }
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
    },

    watch: {
        SELECTED_REQUIREMENT: {
            handler(val) {
                if(val === 1){
                    this.$store.dispatch("GET_REQUIREMENT_DETAIL")  
                }
            },
        }
    },

    mounted(){
        
    }
}
</script>