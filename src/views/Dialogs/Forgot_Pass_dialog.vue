<template>
  <v-row>
    <v-dialog v-model="GET_DIALOG_VAL_FORGOT" persistent max-width="30rem">
      <v-card>
        <v-card-title>{{ GET_DIALOG_MODE_FORGOT }}</v-card-title>
        <v-card-text>
          <v-row v-if="GET_DIALOG_MODE_FORGOT == 'Forgot Password'">
            <v-col>
              <v-text-field
                label="Username"
                :rules="[rules[0]]"
                hide-details="auto"
                v-model="payload.username"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row v-if="GET_DIALOG_MODE_FORGOT == 'Enter Code'">
            <v-col>
              <v-text-field
                label="Enter Code"
                :rules="[rules[0]]"
                hide-details="auto"
                v-model="payload.code"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row v-if="GET_DIALOG_MODE_FORGOT == 'Enter Password'">
            <v-col>
              <v-text-field
                label="Enter New Password"
                :rules="rules"
                hide-details="auto"
                v-model="payload.password"
                type="password"
                outlined
              ></v-text-field>
              <v-text-field
                label="Enter Confirm Password"
                :rules="rules"
                hide-details="auto"
                v-model="payload.confirmPassword"
                type="password"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="closeDialog()" text>
            Close
          </v-btn>
          <v-btn
            color="primary"
            v-if="GET_DIALOG_MODE_FORGOT == 'Forgot Password'"
            text
            @click="checkUsername()"
          >
            Submit
          </v-btn>
          <v-btn
            color="primary"
            v-if="GET_DIALOG_MODE_FORGOT == 'Enter Code'"
            text
            @click="enterCode()"
          >
            Submit
          </v-btn>
          <v-btn
            color="primary"
            v-if="GET_DIALOG_MODE_FORGOT == 'Enter Password'"
            text
            @click="newPass()"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { relativeTimeThreshold } from "moment";
import Swal from "sweetalert2";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["GET_DIALOG_VAL_FORGOT", "GET_DIALOG_MODE_FORGOT"]),
  },
  data() {
    return {
      payload: {
        username: null,
        code: null,
        password: null,
        confirmPassword: null,
      },
      rules: [
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 8) || "Min 8 characters",
      ],
    };
  },
  methods: {
    closeDialog() {
      this.$store.commit("SET_DIALOG_VAL_FORGOT", false);
      this.$store.commit("SET_DIALOG_MODE_FORGOT", null);
      this.payload == null;
    },
    checkUsername() {
      if (this.payload.username === null) {
        this.$swal.fire({
          icon: "error",
          title: "Validation Error",
          text: "Please enter a Username.",
        });
      } else {
        this.$store
          .dispatch("sendCode", this.payload)
          .then((response) => {
            Swal.fire(response.title, response.message, response.icon);
            if (response.status == 1) {
              this.$store.commit("SET_DIALOG_MODE_FORGOT", "Enter Code");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
      // alert(this.payload.username
    },
    enterCode() {
      // alert(this.payload.code)
      if (this.payload.code === null) {
        this.$swal.fire({
          icon: "error",
          title: "Validation Error",
          text: "Please enter a code.",
        });
      } else {
        this.$store
          .dispatch("checkCode", this.payload)
          .then((response) => {
            Swal.fire(response.title, response.message, response.icon);
            if (response.status == 1) {
              this.$store.commit("SET_DIALOG_MODE_FORGOT", "Enter Password");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    },
    newPass() {
      // alert(this.payload.code)
      if (
        this.payload.password === null ||
        this.payload.confirmPassword === null
      ) {
        this.$swal.fire({
          icon: "error",
          title: "Validation Error",
          text: "Please enter a new password and confirm password.",
        });
      } else if (
        this.payload.password.trim().length < 8 &&
        this.payload.confirmPassword.trim().length < 8
      ) {
        console.log("Password length:", this.payload.password.length);
        console.log(
          "Confirm password length:",
          this.payload.confirmPassword.length
        );
        this.$swal.fire({
          icon: "error",
          title: "Validation Error",
          text: "Password length must be equal or greater than 8 characters.",
        });
      } else {
        if (this.payload.password === this.payload.confirmPassword) {
          this.$store
            .dispatch("changePass", this.payload)
            .then((response) => {
              console.log(response);
              Swal.fire(response.title, response.message, response.icon);
              if (response.status == 1) {
                this.$store.commit("SET_DIALOG_VAL_FORGOT", false);
                this.$store.commit("SET_DIALOG_MODE_FORGOT", null);
                this.payload = {}; // Reset payload to an empty object
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        } else {
          this.$swal.fire({
            icon: "warning",
            title: "Warning",
            text: "Password Didn't Match.",
          });
        }
      }
    },
  },
  mounted() {},
};
</script>
