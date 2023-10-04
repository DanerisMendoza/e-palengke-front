<template>
  <v-app style="background: #f5f5f5">
    <v-container>
      <v-row justify="center">
        <v-card outlined class="text-center login-card" elevation="2">
          <div>
            <img
              src="../../assets/sample.jpg"
              alt="E-Palengke Logo"
              class="e-palengke-logo"
              width="100"
            />
          </div>
          <span class="text--disabled"
            >Please fill in your login details below</span
          >
          <v-card-text>
            <v-form ref="myForm" @submit.prevent>
              <v-text-field
                v-model="username"
                label="Username"
                :rules="rules.required"
              >
              </v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                :rules="rules.required"
              ></v-text-field>
            </v-form>
            <v-card-actions>
              <v-btn
                @click="login"
                class="login-btn"
                elevation="0"
                color="primary"
                dark
                >Login</v-btn
              >
            </v-card-actions>
            <v-btn @click="registration" plain text>Registration</v-btn>
          </v-card-text>
        </v-card>
      </v-row>
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
              title: "Account is Not Activated", // Updated title
              text: "Please Wait For Activation Of Your Account", // Updated text message
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
.e-palengke-logo {
  border-radius: 5rem;
}
.login-card {
  width: 25rem;
  border-radius: 0;
  padding: 1rem 1rem 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login-btn {
  width: 100%;
}
</style>
