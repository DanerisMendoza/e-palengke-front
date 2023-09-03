<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="REQUIREMENTS"
        >

        <template v-slot:item="{ item }">
          <tr>
            <td style="text-align: center;">{{ item.name }}</td>
            <td style="text-align: center;">
              <v-chip class='mr-1' v-for="(requirementDetail, i) in item.requirementDetails" :key="i">
                <v-row class="d-flex justify-center align-center pr-3">
                  <v-col cols="12">
                    <div class="text d-flex justify-center ml-3">
                      {{ requirementDetail.name }}
                    </div>
                  </v-col>
                </v-row>
              </v-chip> 
            </td>
            <td style="text-align: center;"> 
              <!-- <v-icon @click="viewItem(item)" class="mr-2">mdi-eye</v-icon> -->
              <v-icon @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
            </td>
          </tr>
        </template>
        </v-data-table>
    </div>
</template>
<script>

import { mapGetters } from 'vuex';

export default {
    data(){
      return {
        headers: [
          { text: "name", align: "center", value: "name", sortable: false },
          { text: "requirement-details", align: "center", sortable: false },
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
    viewItem(item) {
    
    },
    editItem(item) {
      this.$store.commit("SELECTED_REQUIREMENT",item)
    },
    deleteItem(item) {
    
    },
  },

    mounted(){
        this.$store.dispatch("GET_REQUIREMENTS")
        // this.$store.dispatch("GET_REQUIREMENTS_BY_ID",1).then((response) => {
        //   console.log(response);
        // });
        // this.$store.dispatch("GET_REQUIREMENTS_BY_ID",1).then((response) => {
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
        // this.$store.dispatch("CREATE_REQUIREMENT",payload).then((response) => {
        //   console.log(response);
        // });
        // this.$store.dispatch("DELETE_REQUIREMENT_BY_ID",3).then((response) => {
        //   console.log(response);
        // });
        // this.$store.dispatch("UPDATE_REQUIREMENT_BY_ID",payload).then((response) => {
        //   console.log(response);
        // });
    }
}
</script>