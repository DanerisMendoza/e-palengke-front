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
  
      <!-- File input components generated based on requirement_details -->
      <v-file-input
        v-for="(item, index) in requirement_details"
        :key="index"
        :label="item.name"
        v-model="item.value"
        @change="handleFileChange(index)"
        accept="image/*"  
      ></v-file-input>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user_role: [],
        requirement_details: [],
        selected_user_role: null,
      };
    },
    methods: {
      handleUserRoleChange(item) {
        this.$store.dispatch("GET_REQUIREMENT_DETAIL_BY_ID", item).then((response) => {
          this.requirement_details = response;
          this.$store.commit("SELECTED_REQUIREMENT", item)
          // console.log(item)
        });
      },
      handleFileChange(index) {
        // console.log(`File ${index + 1} (${this.requirement_details[index].name}):`, this.requirement_details[index].value);
        // Do something with the selected file
        // console.log(this.requirement_details)
        this.$store.commit("APPLICANT_CREDENTIALS", this.requirement_details)
      },
    },
    mounted() {
      this.$store.dispatch("GET_REQUIREMENTS").then((response) => {
        this.user_role = response;
      });
    },
  };
  </script>
  