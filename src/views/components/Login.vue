<template>
    <v-app>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" sm="6">
            <v-card>
              <v-card-title class="text-center">Login</v-card-title>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="username" label="Username"></v-text-field>
                  <v-text-field v-model="password" label="Password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn color="primary" @click="login">Login</v-btn>
                <v-btn color="secondary" @click="registration">Registration</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: null,
        password: null,
        role: null,
        user_id: null,
      };
    },
    methods: {
      login() {
        const payload = {
          username: this.username,
          password: this.password,
        };
        this.$store.dispatch("LOGIN", payload).then((response) => {
          console.log(response);
           this.$swal.fire({
             icon: "success",
             title: "Success!",
             text: "Operation completed successfully.",
           });
        });
      },
      registration() {
        //   this.$router.push('/userRegistration');
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    margin-top: 100px;
  }
  </style>
  