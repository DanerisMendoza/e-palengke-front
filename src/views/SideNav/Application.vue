<template>
    <v-container>
        <h1>APPLICATION PAGE</h1>
        <v-row>
            <v-col cols="12">
                <Application/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-btn v-if="SELECTED_USER_ROLE_DETAILS!==null" @click="home" class="float-right">HOME</v-btn>
                <v-btn v-if="SELECTED_USER_ROLE_DETAILS!==null" @click="gps" class="float-right">GPS</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <MAP_COMPONENT v-if="SELECTED_USER_ROLE_DETAILS!==null"/>
            </v-col>
        </v-row>
        <v-row v-if="SELECTED_USER_ROLE_DETAILS === 3">
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
        <v-row v-if="SELECTED_USER_ROLE_DETAILS!==null">
            <v-col cols="12">
                <v-btn class="float-right" @click="showSubmitConfirmation">Submit</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    import { mapGetters } from 'vuex';
    import Application from '../components/Application.vue';
    import MAP_COMPONENT from '../components/Map.vue';
    import SideMenuBar from  '@/views/components/SideMenuBar.vue'

export default{
    components: { Application,MAP_COMPONENT,SideMenuBar},
    computed: {
      ...mapGetters([
        "SELECTED_REQUIREMENT",
        "PRODUCT_TYPE_DETAIL",
        "STORE_TYPE_DETAIL",
        "APPLICANT_CREDENTIALS",
        "MARKER_LAT_LNG",
        "REQUIREMENTS",
        "SELECTED_USER_ROLE_DETAILS",
        "USER_DETAILS",
      ]),

      computedRole(){
        if(this.SELECTED_USER_ROLE_DETAILS === null){
            return "";
        }
        else if (this.SELECTED_USER_ROLE_DETAILS === 2) {
            return !this.storeName || !this.selected_store_type_detail || this.selected_store_type_detail.length === 0;
        }
        else if(this.SELECTED_USER_ROLE_DETAILS === 2){
            return "SELECT YOUR MARKET LOCATION"
        }
        else if(this.SELECTED_USER_ROLE_DETAILS === 3){
            return "SELECT YOUR DELIVERY LOCATION"
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
        showSubmitConfirmation() {
        this.$swal.fire({
          title: 'Submit Confirmation',
          text: 'Are you sure you want to submit?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes, submit',
          cancelButtonText: 'No, cancel',
        })
        .then((result) => {
          if (result.isConfirmed) {
            // Handle the submission logic here, e.g., call the `submit` method
            this.submit();
          }
        });
    },
        home(){
            const latitude = this.USER_DETAILS.customer_locations.latitude
            const longitude = this.USER_DETAILS.customer_locations.longitude
            this.$store.commit("MARKER_LAT_LNG",[0,0])  
            this.$store.commit("CENTER",[0,0])  
            this.$store.commit("MARKER_LAT_LNG",[latitude,longitude])  
            this.$store.commit("CENTER",[latitude,longitude])  
            this.$store.commit("ZOOM",19)  
        },
        submit(){
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
                this.$swal.fire({
                    icon: 'error',
                    title: 'Incomplete Credential',
                    text: 'Please complete all requirements before submitting.',
                    });
                    return;
            }
            if(this.MARKER_LAT_LNG === null){
                this.$swal.fire({
                    icon: 'warning',
                    title: 'Location Not Selected',
                    text: 'Please select your location.',
                    });
                    return;
            }
            if (this.SELECTED_USER_ROLE_DETAILS === 2 && (!this.storeName || !this.selected_store_type_detail || this.selected_store_type_detail.length === 0)) {
                this.$swal.fire({
                icon: 'error',
                title: 'Incomplete Information',
                text: 'Please complete the requirements before you submit.',
                });
                return;
            }
            const data = new FormData();
            if (this.APPLICANT_CREDENTIALS.length > 0) {
                for (let i = 0; i < this.APPLICANT_CREDENTIALS.length; i++) {
                    data.append("files[]", this.APPLICANT_CREDENTIALS[i].value);
                }
            }
            data.append("applicantCredential",JSON.stringify( this.APPLICANT_CREDENTIALS));
            data.append("latitude",this.MARKER_LAT_LNG[0]);
            data.append("longitude",this.MARKER_LAT_LNG[1]);
            data.append("status","application-pending");
            data.append("user_role_details_id",this.SELECTED_USER_ROLE_DETAILS);

            if(this.SELECTED_USER_ROLE_DETAILS === 3){
                data.append("storeName",this.storeName);
                data.append("storeType",JSON.stringify(this.selected_store_type_detail));
            }
            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                },
            };

            const payload = {
                params: data,
                config: config,
            };
            this.$store.dispatch("SUBMIT_APPLICANT_CREDENTIAL",payload).then((response)=>{
                console.log(response)
                if(this.SELECTED_USER_ROLE_DETAILS === 3){
                    this.selected_store_type_detail = null;
                    this.storeName = null;
                }
                this.$store.dispatch('GET_MY_APPLICANTS',this.USER_DETAILS.user_id)
                this.$store.commit("SELECTED_ROLE_CLEAR", true)
                this.$swal.fire({
                title: 'Submission Successful',
                text: 'Your application has been submitted successfully!',
                icon: 'success',
                });
            }) 
            
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
        SELECTED_USER_ROLE_DETAILS: {
            handler(val) {
                if(val === 3){
                    this.$store.dispatch("GET_STORE_TYPE_DETAIL")  
                }
            },
        }
    },

    mounted(){
        
    }
}
</script>
