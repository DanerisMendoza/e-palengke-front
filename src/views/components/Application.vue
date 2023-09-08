<template>
    <v-container>
      <!-- Autocomplete component -->
      <v-autocomplete
        v-model="selected_user_role"
        :items="user_role"
        item-text="name"
        item-value="id"
        auto-select-first
        chips
        deletable-chips
        @change="handleUserRoleChange"
      ></v-autocomplete>
  
      <!-- File input components generated based on user_role_details -->
      <v-file-input
        v-for="(item, index) in user_role_details"
        :key="index"
        :label="item.name"
        v-model="item.value"
        @change="handleFileChange(index)"
        accept="image/*"  
      ></v-file-input>
    </v-container>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        user_role: [],
        user_role_details: [],
        selected_user_role: null,
      };
    },
    computed: {
      ...mapGetters([
        "USER_ROLE_DETAILS",
      ]),
    },
    methods: {
      handleUserRoleChange(item) {
        this.$store.dispatch("GET_REQUIREMENT_DETAIL_BY_USER_ROLE_DETAILS_ID", item).then((response) => {
          this.user_role_details = response;
          this.$store.commit("SELECTED_USER_ROLE_DETAILS", item)
        });
      },
      handleFileChange(index) {
        // console.log(`File ${index + 1} (${this.user_role_details[index].name}):`, this.user_role_details[index].value);
        // Do something with the selected file
        // console.log(this.user_role_details)
        this.$store.commit("APPLICANT_CREDENTIALS", this.user_role_details)
      },
    },
    mounted() {
      this.$store.dispatch("GET_USER_ROLE_DETAILS").then((response) => {
        this.user_role = response.filter((item)=>{
          return item.id != 1 && item.id !=2
        });
      });
    },
  };
  </script>
  