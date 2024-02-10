<template>
  <v-app style="background: #0a3862">
    <v-container>
      <!-- <v-app-bar app color="primary" dark elevation="2">
        LOGIN PAGE
        <v-spacer></v-spacer>
        <v-btn plain @click="registration">sign up</v-btn>
        <span class="ml-5 mr-5">|</span>
        <v-btn plain @click="login">login</v-btn>
      </v-app-bar> -->

      <v-card class="login-card" elevation="5">
        <div class="text-center">
          <img src="../../assets/e-palengke-logo.png" alt="E-Palengke Logo" />
          <p class="login-text">Log in to your account</p>
        </div>

        <v-form ref="myForm" @submit.prevent>
          <v-text-field
            v-model="username"
            label="Username"
            :rules="rules.required"
            outlined
            dense
            hide-details="auto"
            class="mb-3"
          >
          </v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            :rules="rules.required"
            outlined
            dense
            hide-details="auto"
            class="mb-4"
          ></v-text-field>
        </v-form>

        <v-btn plain class="mb-3">Forgot password</v-btn>
        <v-btn @click="login" color="#0A3862" dark class="login-btn">
          Login
        </v-btn>
        <div class="text-center">
          <v-btn @click="registration" plain class="mt-3">Registration</v-btn>
        </div>
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
    // this.$Echo.channel('channel-something').listen('something', e => {
    //   console.log(e.result)
    // });
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30rem;
  padding: 2rem;
}
.login-text {
  margin: 0.5rem 0 2rem;
}
</style>
