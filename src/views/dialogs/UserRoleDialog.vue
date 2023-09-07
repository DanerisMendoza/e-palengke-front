<template>
    <v-container>
        <v-dialog v-model="dialog" persistent >
            <v-card >
                <v-row>
                    <v-col>
                        <v-btn text icon class="float-right" @click="closeDialog()">
                            <v-icon>mdi-close-circle</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                    
                <v-row class="ml-2">
                    <v-col cols="12">
                        <h1> {{ SELECTED_ROLE.name }}</h1>
                    </v-col>
                </v-row>
                    
                <v-row class="ml-2 mr-2">
                    <v-col cols="12" >
                            <v-autocomplete
                            v-model="selected_requirement"
                            :items="REQUIREMENT_DETAILS"
                            item-text="name"
                            item-value="id"
                            auto-select-first
                            chips
                            deletable-chips
                            multiple
                            label="Requirement"
                        ></v-autocomplete>
                    </v-col>
                </v-row>
                <v-row class="ml-2 mr-2"> 
                    <v-col cols="12">
                        <v-autocomplete
                            v-model="selected_sidenav"
                            :items="ALL_SIDE_NAV"
                            item-text="name"
                            item-value="id"
                            auto-select-first
                            chips
                            deletable-chips
                            multiple
                            label="ACCESS"
                        ></v-autocomplete>
                    </v-col>
                </v-row>
                <v-row class="mr-2">
                    <v-col cols="12">
                        <v-btn class="float-right" @click="update()">
                           UPDATE
                        </v-btn>
                    </v-col>
                </v-row>
                <br>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
 import { mapGetters } from 'vuex';
    export default{
        data(){
            return {
                dialog:true,
                selected_sidenav: [],
                selected_requirement: []
            } 
        },
        methods: {
            closeDialog(){
                this.$store.commit("SELECTED_ROLE",null)
                this.selected_sidenav = null
                this.selected_requirement = null
            },

            async GET_REQUIREMENT_DETAILS(){
                await this.$store.dispatch("GET_REQUIREMENT_DETAILS")
            },
         
            async GetAllSideNav(){
                await this.$store.dispatch("GetAllSideNav")
            },
        
        
            update(){
                const payload = {
                    id: this.SELECTED_ROLE.id,
                    selected_sidenav: this.selected_sidenav,
                    selected_requirement: this.selected_requirement,
                }
              this.$store.dispatch("UPDATE_USER_ROLE_BY_ID",payload).then((response)=>{
                if(response == 'success'){
                    this.$store.dispatch("GET_USER_ROLE")
                }
              })
            },  
                
        },
        computed: {
            ...mapGetters([
                'SELECTED_ROLE',
                'ALL_SIDE_NAV',
                'REQUIREMENT_DETAILS'
            ])
        },

        watch: {
            // SELECTED_ROLE: {
            //     handler(val) {
            //         this.selected_requirement = (this.SELECTED_ROLE.RequirementDetails.map((item)=>{
            //             return item.requirement_id
            //         }))
            //         this.selected_sidenav = (this.SELECTED_ROLE.Accesses.map((item)=>{
            //             return item.sidenav_id
            //         }));
            //     },
            // }
        },
        
        mounted(){
            console.log(this.SELECTED_ROLE)
            this.GET_REQUIREMENT_DETAILS().then(()=>{
                this.selected_requirement = (this.SELECTED_ROLE.RequirementDetails.map((item)=>{
                        return item.requirement_details_id
                    }))
            })
            this.GetAllSideNav().then(()=>{
                this.selected_sidenav = (this.SELECTED_ROLE.Accesses.map((item)=>{
                        return item.sidenav_id
                }));
            })
        },
    }
</script>