<template>
  <v-card class="card">
    <v-card-title class="card-title">Edit Information</v-card-title>
    <v-form ref="form" @submit.prevent="submit">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4" class="text-center">
            <div>
              <img :src="imageUrl" alt="Profile Picture" width="280" />
            </div>
            <v-file-input
              v-model="file"
              @change="handleFileChange"
              :rules="rules.file"
              label="Profile Picture Upload"
              accept="image/*"
              outlined
              hide-details="auto"
            ></v-file-input>
          </v-col>

          <v-col cols="12" md="8">
            <v-row>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="form.first_name"
                  :rules="rules.required"
                  outlined
                  label="First Name"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="form.middle_name"
                  outlined
                  label="Middle Name"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="form.last_name"
                  :rules="rules.required"
                  outlined
                  label="Last Name"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="4">
                <v-autocomplete
                  v-model="form.gender"
                  :items="genders"
                  item-text="name"
                  item-value="name"
                  :rules="rules.required"
                  auto-select-first
                  chips
                  outlined
                  label="Gender"
                  hide-details="auto"
                ></v-autocomplete>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.email"
                  :rules="rules.email"
                  outlined
                  label="Email"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.address"
                  :rules="rules.required"
                  outlined
                  label="Address"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row class="mb-1">
              <v-col cols="4">
                <v-text-field
                  v-model="form.username"
                  :rules="rules.required"
                  outlined
                  label="Username"
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn type="submit" color="#0c3a68" dark text>Submit</v-btn>
        <v-btn @click="cancel" color="red" dark text>Cancel</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      genders: [{ name: "Male" }, { name: "Female" }, { name: "Others" }],
      file: null,
      show: true,
      imageUrl: require("../../assets/sample.jpg"),
      form: {
        user_id: null,
        username: null,
        age: null,
        gender: null,
        first_name: null,
        middle_name: null,
        last_name: null,
        email: null,
        address: null,
      },
      status: [{ name: "Active" }, { name: "Inactive" }],
      fileSizeLimit: 2 * 1024 * 1024,
      rules: {
        file: [
          (file) =>
            !file ||
            file.size <= this.fileSizeLimit ||
            `File size must be less than ${
              this.fileSizeLimit / (1024 * 1024)
            } MB`,
        ],
        required: [
          (v) => !!v || "Field is required",
          (v) =>
            (v !== null && v !== undefined && !/^\s*$/.test(v)) ||
            "Field is required",
        ],
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
        age: [
          (v) =>
            (v !== null && v !== undefined && !/^\s*$/.test(v)) ||
            "Field is required",
          (v) =>
            (v !== null && v !== undefined && /^\d+$/.test(v)) ||
            "Only numeric values are allowed",
        ],
      },
    };
  },

  computed: {
    ...mapGetters(["USER_DETAILS"]),
  },

  mounted() {
    this.imageUrl =
      this.USER_DETAILS.base64img == null
        ? require("../../assets/sample.jpg")
        : this.USER_DETAILS.base64img;
    this.form.first_name = this.USER_DETAILS.first_name;
    this.form.middle_name = this.USER_DETAILS.middle_name;
    this.form.last_name = this.USER_DETAILS.last_name;
    this.form.email = this.USER_DETAILS.email;
    this.form.gender = this.USER_DETAILS.gender;
    this.form.username = this.USER_DETAILS.username;
    this.form.address = this.USER_DETAILS.address;
    this.form.user_id = this.USER_DETAILS.user_id;
  },

  methods: {
    handleFileChange() {
      if (this.file && this.file.name) {
        this.imageUrl = URL.createObjectURL(this.file);
      }
    },
    cancel() {
      this.$store.commit("PROFILE_UPDATE", null);
    },
    submit() {
      if (this.$refs.form.validate()) {
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
        const data = new FormData();
        data.append("file", this.file);
        data.append("data", JSON.stringify(this.form));

        const payload = {
          params: data,
          config: config,
        };

        this.$swal
          .fire({
            title: "Are you sure?",
            text: "You are about to submit the form!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, submit it!",
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.$store
                .dispatch("UpdateUserByUserID", payload)
                .then((response) => {
                  if (response === "success") {
                    this.$swal.fire({
                      title: "Success!",
                      text: "Form submitted successfully!",
                      icon: "success",
                    });
                    this.$store.dispatch("GetUserDetails").then(() => {
                      this.$store.commit("PROFILE_UPDATE", null);
                      this.$store.dispatch("GetUserDetails").then(() => {
                        this.$store.commit(
                          "PROFILE_PATH",
                          this.USER_DETAILS.base64img
                        );
                      });
                    });
                  } else {
                    this.$swal.fire({
                      title: "Validation Error",
                      text: response,
                      icon: "warning",
                    });
                  }
                });
            }
          });
      }
    },
  },
};
</script>

<style scoped>
.card {
  padding: 0.5rem;
}
.card-title {
  color: #0c3a68;
  font-weight: 400;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
}
</style>
