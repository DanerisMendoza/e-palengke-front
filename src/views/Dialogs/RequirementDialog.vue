<template>
    <v-container fluid>
      <v-dialog v-model="dialog" persistent >
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
              <!-- <h1>{{ SELECTED_REQUIREMENT.name }}</h1> -->
            </v-col>
          </v-row>
          
          <v-row>
              <v-col cols="12">
                  <!-- Form for adding/editing requirement details -->
                  <!-- <v-form ref="myForm" @submit.prevent="submitForm"> -->
                    <v-text-field v-model="name" label="Enter new Requirement-detail"></v-text-field>
                    <v-btn class="float-right" @click="addNewRequirement()">
                        {{ REQUIREMENT_DETAIL_DIALOG }}</v-btn>
                    <!-- </v-form> -->
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
                bottom_sheet: true,
                name: null,
                dialog:true,
                headers: [
                    { text: "Name", align: "center", value: "name", sortable: false },
                    { text: 'Actions', align: "center", value: 'actions', sortable: false },
                ],
                editedItem: null,
            } 
        },
        methods: {
            closeDialog(){
                this.$store.commit("REQUIREMENT_DETAIL_DIALOG",null)
                this.$store.commit("SELECTED_REQUIREMENT",null)
                // this.$store.commit('SELECTED_REQUIREMENT_DETAILS', null);
                // this.$store.commit('REQUIREMENT_DETAIL_BOTTOMSHEET', null);
            },
            
        
            editItem(item){
                this.$store.commit("SELECTED_REQUIREMENT_DETAIL",item)
                this.$store.commit("REQUIREMENT_DETAIL_DIALOG",'UPDATE')
            },
            addNewRequirement() {
            if (this.REQUIREMENT_DETAIL_DIALOG === 'ADD') {
            if (this.name.trim() === '') {
                // Show an error message when the name is empty
                this.$swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Please enter a requirement name before adding.',
                });
            } else {
            // const selectedRequirement = this.SELECTED_REQUIREMENT || {};
            const payload = { name: this.name };
            this.$swal
              .fire({
                icon: 'question',
                title: 'Adding Requirement',
                text: 'Are you sure you want to add a new requirement?',
                showCancelButton: true,
                confirmButtonText: 'Yes, Add it',
                cancelButtonText: 'No, cancel',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
              })
              .then((result) => {
                if (result.isConfirmed) {
                  this.$store.dispatch('STORE_REQUIREMENT_DETAIL', payload).then((response) => {
              
                    if (response === 'success') {
                      this.$swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Adding Requirement Successfully!.',
                      });
                      this.$store.commit('SELECTED_REQUIREMENT_DETAILS', null);
                      this.$store.commit('REQUIREMENT_DETAIL_DIALOG', null);
                      this.$store.dispatch("GET_REQUIREMENT_DETAILS")
                      // this.$store.dispatch('GET_REQUIREMENTS');
                      // this.$store.dispatch('CREATE_REQUIREMENT', payload);
                    }
                  });
                } else {
                  this.$swal.fire({
                    icon: 'question',
                    title: 'Action Cancelled',
                    text: 'You cancelled the Adding operation.',
                  });
                  this.$store.commit('SELECTED_REQUIREMENT_DETAILS', null);
                  this.$store.commit('REQUIREMENT_DETAIL_DIALOG', null);
                }
              });
          }
  
        } else if (this.REQUIREMENT_DETAIL_DIALOG === 'UPDATE') {
          const originalName = this.SELECTED_REQUIREMENT_DETAILS.name;
          const payload = {
            request: {
              name: this.name,
            },
            id: this.SELECTED_REQUIREMENT_DETAILS.id,
          };
          this.$swal
            .fire({
              icon: 'info',
              title: 'Updating Requirement',
              text: 'Are you sure you want to update this requirement?',
              showCancelButton: true,
              confirmButtonText: 'Yes, Update it',
              cancelButtonText: 'No, cancel',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
            })
            .then((result) => {
              if (result.isConfirmed) {
                if (this.name !== originalName) {
                  this.$store.dispatch('UPDATE_REQUIREMENT_DETAIL_BY_ID', payload).then((response) => {
                    if (response === 'success') {
                      this.$swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Requirement Updated Successfully!.',
                      });
                      this.$store.commit('SELECTED_REQUIREMENT_DETAIL', null);
                      this.$store.commit('REQUIREMENT_DETAIL_DIALOG', null);
                      this.$store.dispatch('GET_REQUIREMENTS');
                      this.$store.dispatch('GET_REQUIREMENT_DETAIL_BY_ID', payload.id);
                    }
                  });
                } else {
                  this.$swal.fire({
                    icon: 'info',
                    title: 'No Changes Detected',
                    text: 'No changes were made to the requirement name.',
                  });
                }
              } else {
                this.$swal.fire({
                  icon: 'info',
                  title: 'Action Cancelled',
                  text: 'You cancelled the update operation.',
                });
                this.$store.commit('SELECTED_REQUIREMENT_DETAIL', null);
                this.$store.commit('REQUIREMENT_DETAIL_DIALOG', null);
              }
            });
        }
      },  
    // deleteItem(item){
    //             this.$swal
    //                 .fire({
    //                 icon: 'warning',
    //                 title: 'Delete Item',
    //                 text: 'Are you sure you want to delete this item?',
    //                 showCancelButton: true,
    //                 confirmButtonText: 'Yes, delete it',
    //                 cancelButtonText: 'No, cancel',
    //                 confirmButtonColor: '#d33',
    //                 })
    //                 .then((result) => {
    //                 if (result.isConfirmed) {
    //                     this.$store.dispatch("DELETE_REQUIREMENT_DETAIL_BY_ID", item.id).then((response) => {
    //                     if (response === 'success') {
    //                         this.$swal.fire({
    //                         icon: 'success',
    //                         title: 'Success!',
    //                         text: 'Item Deleted Successfully.',
    //                         });
    //                         this.$store.dispatch("GET_REQUIREMENTS");
    //                         this.$store.dispatch("GET_REQUIREMENT_DETAIL_BY_ID", this.SELECTED_REQUIREMENT.id);
    //                     }
    //                     });
    //                 }
    //                 });
    //             }
 
        },
        computed: {
            ...mapGetters([
                'SELECTED_REQUIREMENT',
                'REQUIREMENT_DETAILS',
                'SELECTED_REQUIREMENT_DETAILS',
                'REQUIREMENT_DETAIL_DIALOG'
            ])
        },
        mounted(){
            // this.$store.dispatch("GET_REQUIREMENT_DETAIL_BY_ID",this.SELECTED_REQUIREMENT.id)
            if (this.REQUIREMENT_DETAIL_DIALOG === 'UPDATE') {
                this.name = this.SELECTED_REQUIREMENT_DETAILS.name;
            }
        },
    }
</script>