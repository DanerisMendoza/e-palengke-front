<template>
    <v-container fluid>
      <v-dialog v-model="dialog" persistent>
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
          
          <v-form ref="myForm" @submit.prevent="submitForm">
            <v-row class="pa-5">
              <v-col cols="12">
                  <v-text-field v-model="form.name" label="Enter Product Name"></v-text-field>
                  <v-text-field v-model="form.price" label="Enter Product Price"></v-text-field>
                  <v-text-field v-model="form.stock" label="Enter Product Stock"></v-text-field>
                  <v-file-input v-model="file" accept="image/*"></v-file-input>
                  <v-btn class="float-right" @click="submit()">
                      {{ PRODUCT_DIALOG }}
                  </v-btn>
                </v-col>
            </v-row>
          </v-form>
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
                form:{
                  store_id: null,
                  name: null,
                  price: null,
                  stock: null,
                },
                file: null,
                dialog:true,
                editedItem: null,
            } 
        },
        methods: {
            closeDialog(){
                this.$store.commit("PRODUCT_DIALOG",null)
            },
            submit(){
              const config = {
                  headers: {
                      "content-type": "multipart/form-data",
                  },
              };
              const data = new FormData();
              data.append("file", this.file);
              data.append("data", JSON.stringify(this.form));

              const payload = {
                  params: data,
                  config: config,
              };

              this.$store.dispatch("STORE_PRODUCT",payload).then((response)=>{
                if (response == 'success') {
                  alert('success')
                  this.$store.commit("PRODUCT_DIALOG",null)
                  this.$store.dispatch('GET_PRODUCT_BY_ID',this.form.store_id)
                }
              })
            }
      },  


        computed: {
            ...mapGetters([
                'PRODUCT_DIALOG',
                'USER_DETAILS'
            ])
        },
        mounted(){
          this.form.store_id = this.USER_DETAILS.user_role_ids.filter((item)=>{
            return item.id === 3 && item.status === 'active'
          })[0].store_id
        },
    }
</script>