<template>
  <v-app style="background: #F5F5F5">
    <v-container>
      <v-row justify="center">
        <v-card outlined class="text-center register-card" elevation="2">
          <v-card-text>
            <v-form ref="myForm" @submit.prevent="registerUser">
              <!-- full name -->
              <v-row>
                <v-col cols="4">
                  <v-text-field
                    v-model="name.firstName"
                    label="First Name"
                    :rules="rules.required"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="name.middleName"
                    label="Middle Name"
                    :rules="rules.required"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="name.lastName"
                    label="Last Name"
                    :rules="rules.required"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
              </v-row>

              <!-- gender -->
              <v-row>
                <v-col cols="6">
                  <v-select
                    v-model="formData.gender"
                    :items="genders"
                    label="Gender"
                    :rules="rules.required"
                    hide-details="auto"
                  ></v-select>
                </v-col>
              </v-row>

              <v-row>
                <!-- age -->
                <v-col cols="6">
                  <v-text-field
                    v-model="formData.age"
                    label="Age"
                    type="number"
                    :rules="rules.required"
                  ></v-text-field>
                </v-col>
                <!-- phone number -->
                <v-col cols="6">
                  <v-text-field
                    v-model="formData.phone_number"
                    label="Phone Number"
                    :rules="rules.contact"
                  ></v-text-field>
                </v-col>
              </v-row>

              <!-- email -->
              <v-text-field
                v-model="formData.email"
                label="Email"
                :rules="rules.email"
              ></v-text-field>

              <!-- address -->
              <v-text-field
                v-model="formData.address"
                label="Address"
                :rules="rules.required"
              ></v-text-field>

              <v-row>
                <v-col cols="6">
                  <!-- username -->
                  <v-text-field
                    v-model="formData.username"
                    label="Username"
                    :rules="rules.required"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <!-- password -->
                  <v-text-field
                    v-model="formData.password"
                    label="Password"
                    type="password"
                    :rules="rules.required"
                  ></v-text-field>
                </v-col>
              </v-row>

              <!-- input file -->
              <v-file-input
                v-for="(item, index) in user_role_details"
                :rules="rules.required"
                :key="index"
                :label="item.name"
                v-model="item.value"
                accept="image/*"
              ></v-file-input>

              <!-- map -->
              <v-btn @click="gps" class="float-right mb-4" color="secondary">My Location</v-btn>
              <MapComp />

              <!-- submit btn -->
              <v-btn
                type="submit"
                :loading="loadSubmit"
                class="register-btn"
                elevation="0"
                color="primary"
                dark
                >SUBMIT</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import MapComp from "../components/Map.vue";
import { mapGetters } from "vuex";
export default {
  components: { MapComp },
  data() {
    return {
      user_role_details: [],
      loadSubmit: false,
      name: {
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
      },
      genders: ["Male", "Female", "Other"], // Gender options
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
  methods: {
    registerUser() {
      if (this.$refs.myForm.validate()) {
        this.loadSubmit = true;
        this.formData.name =
          this.name.firstName +
          " " +
          this.name.middleName +
          " " +
          this.name.lastName;
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
.register-card {
  width: 60rem;
  border-radius: 0;
  padding: 0 1rem 0;
}
.register-btn {
  width: 100%;
}
</style>
