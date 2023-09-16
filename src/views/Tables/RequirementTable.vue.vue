<template>
	<v-container fluid class=" ma-0 pa-0">
    <v-row>
                    <v-col cols="7">
                        <v-btn class="float-right" @click="addNewRequirement()">
                            add new requirement
                        </v-btn>
                    </v-col>
                </v-row>
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
  </v-container>
</template>
<script>

import { mapGetters } from 'vuex';

export default {
    data(){
      return {
        headers: [
          { text: "requirement-details", align: "center", sortable: false },
          { text: 'Actions', align: "center", value: 'actions', sortable: false },
        ],
      } 
    },

    computed: {
      ...mapGetters([
        'REQUIREMENTS',
        'REQUIREMENT_DETAILS',
        'SELECTED_REQUIREMENT_DETAILS',
        'REQUIREMENT_DETAIL_DIALOG'
      ])
	  },

    methods: {
    viewItem(item) {
    
    },
    editItem(item) {
      this.$store.commit("SELECTED_REQUIREMENT_DETAILS", item);
      this.$store.commit("REQUIREMENT_DETAIL_DIALOG", 'UPDATE');
      console.log(this.REQUIREMENT_DETAIL_DIALOG)

  },
    addNewRequirement() {
      this.$store.commit("REQUIREMENT_DETAIL_DIALOG",'ADD')
      console.log(this.REQUIREMENT_DETAIL_DIALOG)
    },
    deleteItem(item) {
      this.$swal
        .fire({
          icon: 'warning',
          title: 'Delete Item',
          text: 'Are you sure you want to delete this item?',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it',
          cancelButtonText: 'No, cancel',
          confirmButtonColor: '#d33',
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$store.dispatch("DELETE_REQUIREMENT_DETAIL_BY_ID", item.id).then((response) => {
              if (response === 'success') {
                this.$swal.fire({
                  icon: 'success',
                  title: 'Success!',
                  text: 'Item Deleted Successfully.',
                });
                this.$store.dispatch("GET_REQUIREMENTS");
                this.$store.dispatch("GET_REQUIREMENT_DETAILS", this.SELECTED_REQUIREMENT_DETAILS.id);
              }
            });
          }
        });  
    },
  },

    mounted(){
        this.$store.dispatch("GET_REQUIREMENT_DETAILS").then(()=>{
          console.log(this.REQUIREMENT_DETAILS)
        })
        // this.$store.dispatch("GET_REQUIREMENTS")
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