<template>
    <v-app>
        <v-data-table
            :headers="headers"
            :items="REQUIREMENTS"
        >
        <template v-slot:item.actions="{ item }">
            <v-icon @click="viewItem(item)" class="mr-2">mdi-eye</v-icon>
            <v-icon @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
        </v-data-table>
    </v-app>
</template>
<script>

import { mapGetters } from 'vuex';

export default {
    data(){
        return {
            headers: [
				{ text: "name", align: "center", value: "name", sortable: false },
                { text: 'Actions', align: "center", value: 'actions', sortable: false },
			],
        } 
    },

    computed: {
		...mapGetters([
			'REQUIREMENTS',
		])
	},

    methods: {
    // Implement CRUD action methods here
    viewItem(item) {
      // Logic for viewing a requirement
    },
    editItem(item) {
      // Logic for editing a requirement
    },
    deleteItem(item) {
      // Logic for deleting a requirement
    },
  },

    mounted(){
        this.$store.dispatch("getRequirements")
        // this.$store.dispatch("getRequirementById",1).then((response) => {
        //   console.log(response);
        // });
        // this.$store.dispatch("getRequirementById",1).then((response) => {
        //   console.log(response);
        // });
        // const payload = {
        //     request:{
        //         name: 'agent2'
        //     },
        //     id:4
        // }
        // const payload = {
        //     name: 'agent'
        // }
        // this.$store.dispatch("createRequirement",payload).then((response) => {
        //   console.log(response);
        // });
        // this.$store.dispatch("deleteRequirementById",3).then((response) => {
        //   console.log(response);
        // });
        // this.$store.dispatch("updateRequirementById",payload).then((response) => {
        //   console.log(response);
        // });
    }
}
</script>