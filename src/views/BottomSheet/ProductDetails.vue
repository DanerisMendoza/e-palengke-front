<template>
    <v-bottom-sheet v-model="bottom_sheet" persistent>
      <v-form ref="myForm" @submit.prevent = "addNewProduct">
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
              <v-text-field v-model="name" label="Enter new Product Type"></v-text-field>
              <v-btn class="float-right" @click="addNewProduct()">
                {{ PRODUCT_TYPE_BOTTOMSHEET}}
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
        this.$store.commit('SELECTED_PRODUCT_DETAILS', null);
        this.$store.commit('PRODUCT_TYPE_BOTTOMSHEET', null);
      },
      addNewProduct() {
        if (this.PRODUCT_TYPE_BOTTOMSHEET === 'ADD') 
        (this.PRODUCT_TYPE_BOTTOMSHEET === 'UPDATE') 
      }
    },
    computed: {
      ...mapGetters(['SELECTED_PRODUCT_DETAILS', 'PRODUCT_TYPE_BOTTOMSHEET']),
    },
    mounted() {
      if (this.PRODUCT_TYPE_BOTTOMSHEET === 'UPDATE') {
        this.name = this.SELECTED_PRODUCT_DETAILS.name;
      }
    },
  };
  </script>
  