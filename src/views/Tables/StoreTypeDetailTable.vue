<template>
    <div>
        <br><br>
        <h1>tableeeeeeeee</h1>
        <!-- <v-data-table
            :headers="headers"
            :items="USER_ROLES"
        >
        </v-data-table> -->

    </div>
</template>

<script>
    export default{
        data(){
            return {
                headers: [
                    { text: "User-Role", align: "center",  sortable: false },
                    { text: "Requirements", align: "center", sortable: false },
                    { text: "Access", align: "center", sortable: false },
                    { text: 'Actions', align: "center", value: 'actions', sortable: false },
                    ],
                } 
            },
        mounted(){
            console.log('hello')
            console.log('hello2')
            // this.$store.dispatch("GET_USER_ROLE_WITH_ACCESSESS_AND_REQUIREMENTS")
        }

    }
</script>