<template>
    <v-container fluid>
        <v-dialog v-model="dialog" persistent fullscreen>
            <v-card>
                <v-row>
                    <v-col>
                        <v-btn text icon class="float-right" @click="closeDialog()">
                            <v-icon>mdi-close-circle</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                    
                <v-row>
                    <v-col cols="6">
                        <h1> {{ SELECTED_REQUIREMENT.name }}</h1>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="7">
                        <v-btn class="float-right" @click="addNewRequirement()">
                            add new requirement-details
                        </v-btn>
                    </v-col>
                </v-row>
                    
                <v-row>
                    <v-col cols="12">
                        <v-data-table
                        :headers="headers"
                        :items="REQUIREMENT_DETAILS"
                        >
                        <template v-slot:item="{ item }">
                            <tr>
                                <td style="text-align: center;">{{ item.name }}</td>
                                <td style="text-align: center;"> 
                                    <!-- <v-icon @click="viewItem(item)" class="mr-2">mdi-eye</v-icon> -->
                                    <v-icon @click="editItem(item)">mdi-pencil</v-icon>
                                    <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                    </v-col>
                </v-row>
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
                headers: [
                    { text: "name", align: "center", value: "name", sortable: false },
                    { text: 'Actions', align: "center", value: 'actions', sortable: false },
                ],
            } 
        },
        methods: {
            closeDialog(){
                this.$store.commit("SELECTED_REQUIREMENT",null)
            },
            addNewRequirement(){
                this.$store.commit("REQUIREMENT_DETAIL_BOTTOMSHEET",'ADD')
            },  
            editItem(item){
                this.$store.commit("SELECTED_REQUIREMENT_DETAIL",item)
                this.$store.commit("REQUIREMENT_DETAIL_BOTTOMSHEET",'UPDATE')
            },  
            deleteItem(item){
                this.$store.dispatch("DELETE_REQUIREMENT_DETAIL_BY_ID",item.id).then((response)=>{
                    if(response == 'success'){
                        this.$store.dispatch("GET_REQUIREMENTS")
                        this.$store.dispatch("GET_REQUIREMENT_DETAIL_BY_ID",this.SELECTED_REQUIREMENT.id)
                    }
                })
            },  
        },
        computed: {
            ...mapGetters([
                'SELECTED_REQUIREMENT',
                'REQUIREMENT_DETAILS',
            ])
        },
        mounted(){
            this.$store.dispatch("GET_REQUIREMENT_DETAIL_BY_ID",this.SELECTED_REQUIREMENT.id)
        },
    }
</script>