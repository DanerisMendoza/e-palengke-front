<template>
    <v-container>
        <br><br>
        <h1>Applicants Window</h1>
        <v-data-table
            :headers="headers"
            :items="APPLICANTS"
        >
        
        <!-- Add a custom render function for the "Actions" column -->
        <template v-slot:item.actions="{ item }">
            <v-btn text @click="view(item.user_role_id)">
            <v-icon>mdi-file-multiple</v-icon>
        </v-btn>
        </template>

        </v-data-table>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default{
        data(){
            return {
                headers: [
                    { text: "Name", value: 'applicant_name', align: "center", sortable: false },
                    { text: "Status", value: 'status', align: "center", sortable: false },
                    { text: "Role", value: 'user_role_name', align: "center", sortable: false },
                    { text: "Gender", value: 'gender', align: "center", sortable: false },
                    { text: "Age", value: 'age', align: "center", sortable: false },
                    { text: 'Actions', value: 'actions', align: "center", sortable: false },
                ],
            } 
        },

        methods: {
            view(item){
               this.$store.commit('SELECTED_CREDENTIAL',item)
            },
        },

        computed: {
            ...mapGetters([
                "APPLICANTS",
            ]),
        },

        mounted(){
            this.$store.dispatch('GET_APPLICANTS').then((response)=>{
                // console.log(this.APPLICANTS)
            })
        }
    }
</script>