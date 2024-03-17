<template>
  <v-app style="background: #0c3a68">
    <v-container>
      <!-- <v-app-bar app color="primary" dark elevation="2">
        REGISTRATION PAGE
        <v-spacer></v-spacer>
        <v-btn plain @click="registration">sign up</v-btn>
        <span class="ml-5 mr-5">|</span>
        <v-btn plain @click="login">login</v-btn>
        <span class="ml-5 mr-5">|</span>
        <v-btn plain @click="mobile">mobile (apk)</v-btn>
      </v-app-bar> -->

      <v-card class="register-card text-center">
        <v-row>
          <v-col cols="12" md="6">
            <v-btn @click="login" class="float-left" plain color="primary">
              <v-icon class="mr-2">mdi-arrow-left</v-icon>Back to Login
            </v-btn>

            <v-btn @click="gps" class="float-right mb-4" color="#0c3a68" dark>
              <v-icon>mdi-map-marker</v-icon>
            </v-btn>
            <MAP_COMPONENT :sidenavViewer="'registration'" />
          </v-col>
          <v-col cols="12" md="6">
            <p>Create your own account</p>
            <v-form ref="myForm" @submit.prevent="registerUser">
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="formData.first_name"
                    label="First Name"
                    :rules="rules.required"
                    hide-details="auto"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="formData.middle_name"
                    label="Middle Name"
                    :rules="rules.required"
                    hide-details="auto"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="formData.last_name"
                    label="Last Name"
                    :rules="rules.required"
                    hide-details="auto"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="formData.gender"
                    :items="genders"
                    label="Gender"
                    :rules="rules.required"
                    hide-details="auto"
                    outlined
                    dense
                  ></v-select>
                </v-col>
                <!-- <v-col cols="4">
              <v-text-field
                v-model="formData.age"
                label="Age"
                type="number"
                :rules="rules.required"
                hide-details="auto"
                outlined
                dense
              ></v-text-field>
            </v-col> -->
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="formData.phone_number"
                    label="Phone Number"
                    :rules="rules.contact"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-text-field
                v-model="formData.email"
                label="Email"
                :rules="rules.email"
                outlined
                dense
              ></v-text-field>

              <v-textarea
                v-model="formData.address"
                label="Address"
                :rules="rules.required"
                outlined
                dense
                rows="2"
              ></v-textarea>

              <!-- <v-row>
            <v-col cols="12" sm="4">
              <v-text-field
                label="Region/State"
                outlined
                dense
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-select
                label="Province/City"
                outlined
                dense
                hide-details="auto"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4">
              <v-select
                label="Barangay"
                outlined
                dense
                hide-details="auto"
              ></v-select>
            </v-col>
          </v-row> -->

              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="formData.username"
                    label="Username"
                    :rules="rules.required"
                    hide-details="auto"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="formData.password"
                    label="Password"
                    type="password"
                    :rules="rules.password"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-file-input
                v-for="(item, index) in user_role_details"
                :rules="rules.required"
                :key="index"
                :label="item.name"
                v-model="item.value"
                accept="image/*"
                outlined
                dense
              ></v-file-input>

              <v-btn
                type="submit"
                :loading="loadSubmit"
                color="#0c3a68"
                dark
                class="register-btn"
              >
                register
              </v-btn>
            </v-form>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import MAP_COMPONENT from "../components/Map.vue";
import { mapGetters } from "vuex";
export default {
  components: { MAP_COMPONENT },
  data() {
    return {
      user_role_details: [],
      loadSubmit: false,
      formData: {
        username: null,
        first_name: null,
        middle_name: null,
        last_name: null,
        gender: null,
        age: null,
        phone_number: null,
        address: null,
        email: null,
        password: null,
        confirm_password: null,
        latitude: null,
        longitude: null,
      },
      genders: ["Male", "Female", "Other"], // Gender options
      rules: {
        required: [(v) => !!v || "Field is required"],
        min: [(v) => v.length >= 8 || "Min 8 characters"],
        email: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ],
        password: [
          (v) => !!v || "Field is required",
          (v) =>
            (v !== null && v !== undefined && !/^\s*$/.test(v)) ||
            "Field is required",
          (v) =>
            (v !== null && v !== undefined && v.length >= 8) ||
            "Min 8 characters",
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
  methods: {
    registerUser() {
      if (this.$refs.myForm.validate()) {
        this.loadSubmit = true;
        this.formData.latitude = this.MARKER_LAT_LNG[0];
        this.formData.longitude = this.MARKER_LAT_LNG[1];
        const data = new FormData();

        if (this.user_role_details.length > 0) {
          for (let i = 0; i < this.user_role_details.length; i++) {
            data.append("files[]", this.user_role_details[i].value);
          }
        }
        data.append(
          "applicantCredential",
          JSON.stringify(this.user_role_details)
        );
        data.append("form", JSON.stringify(this.formData));
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
        const payload = {
          params: data,
          config: config,
        };

        this.$store.dispatch("Register", payload).then((response) => {
          if (response === "success") {
            this.loadSubmit = false;
            this.$swal.fire({
              icon: "success", // Set the success icon
              title: "Success", // Title of the alert
              text: "Operation was successful!", // Text message
              showConfirmButton: false, // Remove the "OK" button
              timer: 1000, // Auto-close the alert after 1.5 seconds (adjust as needed)
            });
            this.$router.push("/Login");
          } else {
            this.loadSubmit = false;
            this.$swal.fire({
              title: "Validation Error",
              text: response,
              icon: "warning",
            });
          }
        });
      }
    },
    handleUserRoleChange(item) {
      this.$store
        .dispatch("GET_REQUIREMENT_DETAIL_BY_USER_ROLE_DETAILS_ID", item)
        .then((response) => {
          this.user_role_details = response;
          this.$store.commit(
            "SELECTED_USER_ROLE_DETAILS",
            "customerRegistration"
          );
        });
    },
    gps() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            this.$store.commit("MARKER_LAT_LNG", [0, 0]);
            this.$store.commit("CENTER", [0, 0]);
            this.$store.commit("MARKER_LAT_LNG", [latitude, longitude]);
            this.$store.commit("CENTER", [latitude, longitude]);
            this.$store.commit("ZOOM", 19);
            this.$store.commit("SELECTED_USER_ROLE_DETAILS", "customerStore");
          },
          (error) => {
            if (error.code === 1) {
              console.log("User denied geolocation access."); // User chose "Block"
            } else {
              console.error("Error getting coordinates:", error);
            }
          }
        );
      } else {
        console.error("Geolocation is not supported in this browser.");
      }
    },
    login() {
      this.$router.push("/Login");
    },
    registration() {
      this.$router.push("/Registration");
    },
    mobile() {
      this.$router.push("/Mobile");
    },
  },
  computed: {
    ...mapGetters(["MARKER_LAT_LNG"]),
  },
  mounted() {
    this.handleUserRoleChange(2);
    this.gps();
  },
};
</script>

<style scoped>
/* .register-card {
  width: 50rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1rem 2rem;
}
.login-btn {
  width: 100%;
} */
.register-card {
  width: 80rem;
  padding: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.register-btn {
  width: 10rem;
}
</style>
