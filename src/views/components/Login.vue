<template>
  <v-app style="background: #d0dae3">
    <v-container>
      <v-app-bar app color="primary" dark elevation="2">
        LOGIN PAGE
        <v-spacer></v-spacer>
        <v-btn plain @click="registration">sign up</v-btn>
        <span class="ml-5 mr-5">|</span>
        <v-btn plain @click="login">login</v-btn>
      </v-app-bar>

      <v-card class="text-center login-card" elevation="2" outlined>
        <img src="../../assets/logo3.png" alt="E-Palengke Logo" />
        <p>Log in to your account</p>

        <v-form ref="myForm" @submit.prevent>
          <v-text-field v-model="username" label="Username" :rules="rules.required" outlined dense hide-details="auto"
            class="mb-3">
          </v-text-field>
          <v-text-field v-model="password" label="Password" type="password" :rules="rules.required" outlined dense
            hide-details="auto" class="mb-4"></v-text-field>
        </v-form>

        <v-btn @click="login" color="primary" class="login-btn mb-1">Login</v-btn>
        <v-btn plain>Forgot password</v-btn>
        <v-btn @click="registration" plain>Registration</v-btn>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      username: null,
      password: null,
      role: null,
      user_id: null,
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
          (v) =>
            (v !== null && v !== undefined && v.length <= 11) ||
            "Max 11 characters",
        ],
      },
    };
  },

  computed: {
    ...mapGetters(["SIDE_NAV"]),
  },

  created() {
    this.$Echo.channel('channel-something').listen('something', e => {
      console.log(e.result)
    });
  },

  methods: {
    login() {
      if (this.$refs.myForm.validate()) {
        const payload = {
          username: this.username,
          password: this.password,
        };
        this.$store.dispatch("LOGIN", payload).then((response) => {
          if (response.message === "success") {
            localStorage.setItem("e-palengke-token", response.token);
            this.$store.dispatch("GetSideNav").then((response) => {
              this.$router.push(response[0].name);
            });
          } else if (response.message === "not active") {
            this.$swal.fire({
              icon: "warning", // Set a warning icon (you can choose a different icon class)
              title: "Your Account is currently being review.", // Updated title
              text: "Please wait for Activation!", // Updated text message
              showConfirmButton: false, // Remove the "OK" button
              timer: 2000, // Auto-close the alert after 1.5 seconds (adjust as needed)
            });
          } else {
            this.$swal.fire({
              icon: "warning", // Set a warning icon (you can choose a different icon class)
              title: "Credential Incorrect!", // Updated title
              text: "Please Check your Username or Password!", // Updated text message
              showConfirmButton: false, // Remove the "OK" button
              timer: 2000, // Auto-close the alert after 1.5 seconds (adjust as needed)
            });
          }
        });
      }
    },
    registration() {
      this.$router.push("/Registration");
    },
  },
};
</script>

<style scoped>
.login-btn {
  width: 100%;
}

.login-card {
  width: 25rem;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem 2rem;
}
</style>
