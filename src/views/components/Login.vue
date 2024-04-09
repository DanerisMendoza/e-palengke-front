<template>
  <v-app style="background: #0c3a68">
    <v-container>
      <!-- <v-app-bar app color="primary" dark elevation="2">
        LOGIN PAGE
        <v-spacer></v-spacer>
        <v-btn plain @click="registration">sign up</v-btn>
        <span class="ml-5 mr-5">|</span>
        <v-btn plain @click="login">login</v-btn>
        <span class="ml-5 mr-5">|</span>
        <v-btn plain @click="mobile">mobile (apk)</v-btn>
      </v-app-bar> -->

      <v-btn plain color="#FFFFFF" @click="landingPage">
        <v-icon class="mr-2">mdi-arrow-left</v-icon>
        Back to Home
      </v-btn>

      <v-card class="login-card text-center">
        <div>
          <img
            src="../../assets/ep-only.png"
            alt="E-Palengke Logo"
            width="150"
          />
        </div>
        <p>Log in to your account</p>

        <v-form ref="myForm" @submit.prevent>
          <v-text-field
            v-model="username"
            label="Username"
            :rules="rules.required"
            outlined
            hide-details="auto"
            class="mb-4"
          >
          </v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            :rules="rules.required"
            outlined
            hide-details="auto"
          ></v-text-field>
        </v-form>

        <v-btn plain class="mt-2" @click="openDialogForgot()">Forgot password</v-btn>

        <div class="mt-2 mb-2">
          <v-btn @click="login" color="#0c3a68" dark class="login-btn" large
            >Login</v-btn
          >
        </div>

        <v-btn @click="registration" plain>Registration</v-btn>

        <v-divider class="mt-2 mb-2"></v-divider>

        <v-btn @click="mobile" color="primary" plain>
          <v-icon class="mr-2">mdi-qrcode</v-icon>
          Download Mobile APK
        </v-btn>
      </v-card>
      <forgotDialog v-if="GET_DIALOG_VAL_FORGOT == true"/>
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import forgotDialog from "../Dialogs/Forgot_Pass_dialog.vue";

export default {
  components: { forgotDialog },
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
    ...mapGetters(["SIDE_NAV","GET_DIALOG_VAL_FORGOT","GET_DIALOG_MODE_FORGOT",]),
  },

  created() {
    // this.$Echo.channel('channel-something').listen('something', e => {
    //   console.log(e.result)
    // });
  },

  methods: {
    openDialogForgot() {
      this.$store.commit("SET_DIALOG_VAL_FORGOT", true); // mutation name
      this.$store.commit("SET_DIALOG_MODE_FORGOT", "Forgot Password"); // mutation name
    },
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
    mobile() {
      this.$router.push("/Mobile");
    },
    landingPage() {
      this.$router.push("/LandingPage");
    },
  },
};
</script>

<style scoped>
.login-card {
  width: 25rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem 2rem;
}
.login-btn {
  width: 100%;
}
</style>
