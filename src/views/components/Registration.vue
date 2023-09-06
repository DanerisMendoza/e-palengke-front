<template>
    <v-container>
      <v-form ref="myForm" @submit.prevent="registerUser">
        <v-text-field v-model="name.firstName" label="First Name" :rules="rules.required"></v-text-field>
        <v-text-field v-model="name.middleName" label="Middle Name" :rules="rules.required"></v-text-field>
        <v-text-field v-model="name.lastName" label="Last Name" :rules="rules.required"></v-text-field>
        <v-select
          v-model="formData.gender"
          :items="genders"
          label="Gender"
          required
          ></v-select>
          <v-text-field v-model="formData.age" label="Age" type="number" :rules="rules.required"></v-text-field>
          <v-text-field v-model="formData.phone_number" label="Phone Number" :rules="rules.required"></v-text-field>
          <v-text-field v-model="formData.address" label="Address" :rules="rules.required"></v-text-field>
          <v-text-field v-model="formData.email" label="Email" :rules="rules.required"></v-text-field>
          <v-text-field v-model="formData.username" label="Username" :rules="rules.required"></v-text-field>
        <v-text-field v-model="formData.password" label="Password" type="password" :rules="rules.required"></v-text-field>
        <!-- Add more Vuetify form fields for other data as needed -->
        <v-btn type="submit" color="primary" :loading="loadSubmit">Register</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        loadSubmit: false,
        name:{
          firstName: null,
          middleName: null,
          lastName: null,
        },
        formData: {
          username: null,
          name: null,
          gender: null,
          age: null,
          phone_number: null,
          address: null,
          email: null,
          password: null,
          confirm_password: null,
          latitude: null,
          longitude: null,
          // Add more fields here as needed
        },
        genders: ['Male', 'Female', 'Other'], // Gender options
        rules: {
          required: [(v) => !!v || "Field is required"],
          min: [(v) => v.length >= 8 || "Min 8 characters"],
          email: [
            (v) => !!v || "E-mail is required",
            (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
          ],
          contact: [
            (v) =>
              (v !== null && v !== undefined && /^\d+$/.test(v)) ||
              "Only numeric values are allowed",
            (v) =>
              (v !== null && v !== undefined && v.length >= 11) ||
              "Min 11 characters",
          ],
        },
      };
    },
    methods: {
      registerUser() {
        if (this.$refs.myForm.validate()) {
          this.loadSubmit = true;
          this.formData.name = this.name.firstName +" "+this.name.middleName+" "+this.name.lastName
          this.$store.dispatch("Register", this.formData).then((response)=>{
            if(response === 'success'){
              this.loadSubmit = false;
              alert('success')
              this.$router.push('/Login');
            }
          })
        }
        // Send a POST request with formData to your registration API
        // You can use Axios or another HTTP library for this
        // Include the user_id field if applicable
        // Handle success and error cases accordingly
      },
    },
  };
  </script>
  