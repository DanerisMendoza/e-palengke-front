<template>
  <v-app style="background: #c8e0f6">
    <v-container class="container">
      <div class="page-title">
        <p class="text-h4">Application</p>
      </div>

      <ApplicantsCredentialDialog v-if="this.SELECTED_CREDENTIAL !== null" />
      <v-card elevation="2" outlined class="application">
        <v-form ref="myForm" @submit.prevent="submit">
          <Application />

          <div class="float-right mb-3">
            <v-btn
              v-if="SELECTED_USER_ROLE_DETAILS !== null"
              @click="home"
              color="#0c3a68"
              class="mr-2"
              dark
            >
              <v-icon>mdi-home</v-icon></v-btn
            >
            <v-btn
              v-if="SELECTED_USER_ROLE_DETAILS !== null"
              @click="gps"
              color="#0c3a68"
              dark
            >
              <v-icon>mdi-map-marker</v-icon>
            </v-btn>
          </div>

          <div v-if="SELECTED_USER_ROLE_DETAILS !== null" class="mb-3">
            <MAP_COMPONENT :sidenavViewer="'application'" />
          </div>

          <v-row v-if="SELECTED_USER_ROLE_DETAILS === 3">
            <v-col cols="12" md="4">
              <v-text-field
                v-model="storeName"
                label="Enter Your Store Name"
                :rules="rules.required"
                outlined
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="storeAddress"
                label="Enter Your Store Address"
                :rules="rules.required"
                outlined
                hide-details="auto"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
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
                outlined
                hide-details="auto"
              ></v-autocomplete>
            </v-col>
          </v-row>

          <v-row v-if="SELECTED_USER_ROLE_DETAILS !== null">
            <v-col cols="12" class="text-center">
              <v-btn class="submit-btn" type="submit" color="#0c3a68" dark
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
.page-title p {
  margin-bottom: 1rem;
  color: #0c3a68;
}
.container {
  padding: 0 2.5rem 0;
}
.application {
  padding: 1rem;
}
.submit-btn {
  width: 10rem;
}
</style>
