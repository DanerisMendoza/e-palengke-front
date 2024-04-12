<template>
  <v-app class="app_container">
    <!-- v-container limit width -->
    <v-container>
      <v-card class="card">
        <v-btn @click="login" plain color="primary">
          <v-icon>mdi-arrow-left</v-icon>Back to Login
        </v-btn>
        <div class="dynamic_container">
          <!-- map group -->
          <div
            style="
              display: flex;
              flex-direction: column;
              gap: 0.5rem;
              height: 100%;
              width: 100%;
            "
          >
            <v-btn @click="gps" class="gps_button" color="#0c3a68" dark>
              <v-icon>mdi-map-marker</v-icon>
            </v-btn>
            <MAP_COMPONENT class="map" :sidenavViewer="'registration'" />
          </div>
          <!-- form -->
          <v-form ref="myForm" class="form" @submit.prevent="registerUser">
            <p class="form_label">
              Create your own account
              <span style="color: grey; font-size: 0.7rem"
                >(Allow or Pin Location)</span
              >
            </p>
            <div class="form_field">
              <div class="name_group">
                <v-text-field
                  class="child_field"
                  v-model="formData.first_name"
                  label="First Name"
                  hide-details="auto"
                  :rules="rules.required"
                  outlined
                  full-width
                ></v-text-field>
                <v-text-field
                  class="child_field"
                  v-model="formData.middle_name"
                  label="Middle Name"
                  hide-details="auto"
                  :rules="rules.required"
                  outlined
                  full-width
                ></v-text-field>
                <v-text-field
                  class="child_field"
                  v-model="formData.last_name"
                  label="Last Name"
                  hide-details="auto"
                  :rules="rules.required"
                  outlined
                  full-width
                ></v-text-field>
              </div>
              <div class="contact_group">
                <v-select
                  class="child_field"
                  v-model="formData.gender"
                  label="Gender"
                  hide-details="auto"
                  :items="genders"
                  :rules="rules.required"
                  outlined
                ></v-select>
                <v-text-field
                  class="child_field"
                  v-model="formData.phone_number"
                  label="Phone Number"
                  hide-details="auto"
                  :rules="rules.contact"
                  outlined
                ></v-text-field>
                <v-text-field
                  class="child_field"
                  v-model="formData.email"
                  label="Email"
                  hide-details="auto"
                  :rules="rules.email"
                  outlined
                ></v-text-field>
              </div>
              <div class="credential_group">
                <v-text-field
                  v-model="formData.address"
                  label="Address"
                  hide-details="auto"
                  :rules="rules.required"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="formData.username"
                  label="Username"
                  :rules="rules.required"
                  hide-details="auto"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="formData.password"
                  label="Password"
                  type="password"
                  :rules="rules.password"
                  hide-details="auto"
                  outlined
                ></v-text-field>
              </div>
              <v-file-input
                v-for="(item, index) in user_role_details"
                :rules="rules.required"
                :key="index"
                :label="item.name"
                v-model="item.value"
                accept="image/*"
                hide-details="auto"
                outlined
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
            </div>
          </v-form>
        </div>
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
.app_container {
  background-image: url(../../assets/bg-custom2.svg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.card {
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 3%;
}
.form_label {
  align-self: center;
}

/* mobile */
@media (max-width: 640px) {
  .dynamic_container {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .form_field {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
  .map {
    /* width: 100%; */
  }
  .name_group {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
  .contact_group {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
  .credential_group {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
  .form_label {
    padding-top: 1rem;
  }
}
/* higer width than mobile */
@media (min-width: 640px) {
  .card {
    height: 100%;
    width: 100%;
  }
  .dynamic_container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    /* justify-content: stretch; */
    gap: 1rem;
  }
  .map {
    flex-grow: 1;
    width: 100%;
  }
  .form {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .form_field {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
  .name_group {
    display: flex;
    flex-direction: row;
    gap: 0.3rem;
  }
  .contact_group {
    display: flex;
    flex-direction: row;
    gap: 0.3rem;
  }
  .credential_group {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
  .gps_button {
    align-self: end;
    width: 3rem;
  }
  /* make children have even width */
  .name_group > *,
  .contact_group > * {
    width: 30%;
  }
}
</style>
