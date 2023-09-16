<template>
    <v-bottom-sheet v-model="bottom_sheet" persistent>
      <v-form ref="myForm" @submit.prevent = "addNewRequirement">
        <v-sheet height="300px">
          <v-row>
            <v-col>
              <v-btn text icon class="float-right" @click="closeDialog()">
                <v-icon>mdi-close-circle</v-icon>
              </v-btn>
            </v-col>
          </v-row>
  
          <v-row class="ml-12">
            <v-col cols="12" lg="4" class="text-center mx-auto">
              <v-text-field v-model="name" label="Enter new Requirement-detail"></v-text-field>
              <v-btn class="float-right" @click="addNewRequirement()">
                {{ REQUIREMENT_DETAIL_BOTTOMSHEET }}
              </v-btn>
            </v-col>
          </v-row>
        </v-sheet>
      </v-form>
    </v-bottom-sheet>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    data() {
      return {
        bottom_sheet: true,
        name: null,
      };
    },
    methods: {
      closeDialog() {
        this.$store.commit('SELECTED_REQUIREMENT_DETAILS', null);
        this.$store.commit('REQUIREMENT_DETAIL_BOTTOMSHEET', null);
      },
      addNewRequirement() {
        if (this.REQUIREMENT_DETAIL_BOTTOMSHEET === 'ADD') 
        (this.REQUIREMENT_DETAIL_BOTTOMSHEET === 'UPDATE') 
      }
    },
    computed: {
      ...mapGetters(['SELECTED_REQUIREMENT', 'SELECTED_REQUIREMENT_DETAILS', 'REQUIREMENT_DETAIL_BOTTOMSHEET']),
    },
    mounted() {
      if (this.REQUIREMENT_DETAIL_BOTTOMSHEET === 'UPDATE') {
        this.name = this.SELECTED_REQUIREMENT_DETAILS.name;
      }
    },
  };
  </script>
  