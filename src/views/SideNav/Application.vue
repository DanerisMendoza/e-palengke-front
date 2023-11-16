<template>
  <v-app style="background: #d0dae3">
    <v-container>
      <v-card class="application">
        <h2 class="font-weight-bold mb-3">{{ $route.name }}</h2>

        <ApplicantsCredentialDialog v-if="this.SELECTED_CREDENTIAL !== null" />

        <v-form ref="myForm" @submit.prevent="submit">
          <Application />

          <v-row>
            <v-col cols="12">
              <v-btn
                v-if="SELECTED_USER_ROLE_DETAILS !== null"
                @click="home"
                color="success"
                class="float-right mr-3"
              >
                <v-icon>mdi-home</v-icon></v-btn
              >
              <v-btn
                v-if="SELECTED_USER_ROLE_DETAILS !== null"
                @click="gps"
                color="error"
                class="float-right mr-2"
              >
                <v-icon>mdi-map-marker</v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <MAP_COMPONENT
            v-if="SELECTED_USER_ROLE_DETAILS !== null"
            :sidenavViewer="'application'"
          />

          <v-row v-if="SELECTED_USER_ROLE_DETAILS === 3">
            <v-col cols="4" class="mt-2">
              <v-text-field
                v-model="storeName"
                label="Enter Your Store Name:"
                :rules="rules.required"
              ></v-text-field>
            </v-col>
            <v-col cols="4" class="mt-2">
              <v-text-field
                v-model="storeAddress"
                label="Enter Your Store Address:"
                :rules="rules.required"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-autocomplete
                v-model="selected_store_type_detail"
                :items="STORE_TYPE_DETAIL"
                item-text="name"
                item-value="id"
                label="SELECT STORE TYPE"
                auto-select-first
                chips
                multiple
                :rules="rules.required"
                deletable-chips
              ></v-autocomplete>
            </v-col>
          </v-row>

          <v-row v-if="SELECTED_USER_ROLE_DETAILS !== null">
            <v-col cols="12" class="text-center">
              <v-btn class="submit-btn" type="submit" color="primary"
                >Submit</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-container>
  </v-app>
</template>
<script>
import { mapGetters } from "vuex";
import Application from "../components/Application.vue";
import MAP_COMPONENT from "../components/Map.vue";
import SideMenuBar from "@/views/components/SideMenuBar.vue";
import ApplicantsCredentialDialog from "../Dialogs/ApplicantsCredentialDialog.vue";

export default {
  components: {
    Application,
    MAP_COMPONENT,
    SideMenuBar,
    ApplicantsCredentialDialog,
  },
  computed: {
    ...mapGetters([
      "SELECTED_REQUIREMENT",
      "PRODUCT_TYPE_DETAIL",
      "STORE_TYPE_DETAIL",
      "APPLICANT_CREDENTIALS",
      "MARKER_LAT_LNG",
      "REQUIREMENTS",
      "SELECTED_USER_ROLE_DETAILS",
      "USER_DETAILS",
      "SELECTED_CREDENTIAL",
    ]),

    computedRole() {
      if (this.SELECTED_USER_ROLE_DETAILS === null) {
        return "";
      } else if (this.SELECTED_USER_ROLE_DETAILS === 2) {
        return (
          !this.storeName ||
          !this.selected_store_type_detail ||
          this.selected_store_type_detail.length === 0
        );
      } else if (this.SELECTED_USER_ROLE_DETAILS === 2) {
        return "SELECT YOUR MARKET LOCATION";
      } else if (this.SELECTED_USER_ROLE_DETAILS === 3) {
        return "SELECT YOUR DELIVERY LOCATION";
      }
    },
  },

  data() {
    return {
      selected_store_type_detail: null,
      storeName: null,
      storeAddress: null,
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
    showSubmitConfirmation() {
      this.$swal
        .fire({
          title: "Submit Confirmation",
          text: "Are you sure you want to submit?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Yes, submit",
          cancelButtonText: "No, cancel",
        })
        .then((result) => {
          if (result.isConfirmed) {
            // Handle the submission logic here, e.g., call the `submit` method
            this.submit();
          }
        });
    },
    home() {
      const latitude = this.USER_DETAILS.customer_locations.latitude;
      const longitude = this.USER_DETAILS.customer_locations.longitude;
      this.$store.commit("MARKER_LAT_LNG", [0, 0]);
      this.$store.commit("CENTER", [0, 0]);
      this.$store.commit("MARKER_LAT_LNG", [latitude, longitude]);
      this.$store.commit("CENTER", [latitude, longitude]);
      this.$store.commit("ZOOM", 19);
    },
    submit() {
      if (this.$refs.myForm.validate()) {
        this.$swal
          .fire({
            title: "Submit Confirmation",
            text: "Are you sure you want to submit?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, submit",
            cancelButtonText: "No, cancel",
          })
          .then(() => {
            let isCredentialComplete =
              this.APPLICANT_CREDENTIALS.length === 0 ? false : true;
            this.APPLICANT_CREDENTIALS.forEach((item) => {
              if (!item.hasOwnProperty("value")) {
                isCredentialComplete = false;
              } else if (item.value === null) {
                isCredentialComplete = false;
              }
            });
            if (!isCredentialComplete) {
              this.$swal.fire({
                icon: "error",
                title: "Incomplete Credential",
                text: "Please complete all requirements before submitting.",
              });
              return;
            }
            if (this.MARKER_LAT_LNG === null) {
              this.$swal.fire({
                icon: "warning",
                title: "Location Not Selected",
                text: "Please select your location.",
              });
              return;
            }
            if (
              this.SELECTED_USER_ROLE_DETAILS === 2 &&
              (!this.storeName ||
                !this.selected_store_type_detail ||
                this.selected_store_type_detail.length === 0)
            ) {
              this.$swal.fire({
                icon: "error",
                title: "Incomplete Information",
                text: "Please complete the requirements before you submit.",
              });
              return;
            }
            const data = new FormData();
            if (this.APPLICANT_CREDENTIALS.length > 0) {
              for (let i = 0; i < this.APPLICANT_CREDENTIALS.length; i++) {
                data.append("files[]", this.APPLICANT_CREDENTIALS[i].value);
              }
            }
            data.append(
              "applicantCredential",
              JSON.stringify(this.APPLICANT_CREDENTIALS)
            );
            data.append("latitude", this.MARKER_LAT_LNG[0]);
            data.append("longitude", this.MARKER_LAT_LNG[1]);
            data.append("status", "application-pending");
            data.append(
              "user_role_details_id",
              this.SELECTED_USER_ROLE_DETAILS
            );

            if (this.SELECTED_USER_ROLE_DETAILS === 3) {
              data.append("storeAddress", this.storeAddress);
              data.append("storeName", this.storeName);
              data.append(
                "storeType",
                JSON.stringify(this.selected_store_type_detail)
              );
            }
            const config = {
              headers: {
                "content-type": "multipart/form-data",
              },
            };

            const payload = {
              params: data,
              config: config,
            };
            this.$store
              .dispatch("SUBMIT_APPLICANT_CREDENTIAL", payload)
              .then((response) => {
                console.log(response);
                if (this.SELECTED_USER_ROLE_DETAILS === 3) {
                  this.selected_store_type_detail = null;
                  this.storeName = null;
                }
                this.$store.dispatch(
                  "GET_MY_APPLICANTS",
                  this.USER_DETAILS.user_id
                );
                this.$store.commit("SELECTED_ROLE_CLEAR", true);
                this.$swal.fire({
                  title: "Submission Successful",
                  text: "Your application has been submitted successfully!",
                  icon: "success",
                });
              });
          });
      }
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

  watch: {
    SELECTED_USER_ROLE_DETAILS: {
      handler(val) {
        if (val === 3) {
          this.$store.dispatch("GET_STORE_TYPE_DETAIL");
        }
      },
    },
  },

  mounted() {},
};
</script>

<style scoped>
.application {
  border-top: 5px solid #1976d2;
  padding: 1rem;
}
.submit-btn {
  width: 10rem;
}
</style>
