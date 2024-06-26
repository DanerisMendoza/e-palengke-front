<template>
  <v-dialog v-model="dialog" width="500" persistent>
    <v-card class="card">
      <v-card-title class="card-title">Product Type Details</v-card-title>
      <v-card-text>
        <v-text-field
          label="Enter New Product Type"
          :rules="rules.required"
          v-model="name"
          hide-details="auto"
          outlined
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#0c3a68" text @click="handleOperation()">
          {{ PRODUCT_TYPE_DETAILS_DIALOG }}
        </v-btn>
        <v-btn color="red" text @click="closeDialog()">close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      bottom_sheet: true,
      name: null,
      dialog: true,
      headers: [
        { text: "Name", align: "center", value: "name", sortable: false },
        { text: "Actions", align: "center", value: "actions", sortable: false },
      ],
      editedItem: null,
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
    closeDialog() {
      this.$store.commit("PRODUCT_TYPE_DETAILS_DIALOG", null);
      this.$store.commit("SELECTED_PRODUCT_TYPE_DETAILS", null);
    },

    handleOperation() {
      if (this.PRODUCT_TYPE_DETAILS_DIALOG === "ADD") {
        const payload = { name: this.name };
        this.$swal
          .fire({
            icon: "question",
            title: "Adding Requirement",
            text: "Are you sure you want to add a new Product Type?",
            showCancelButton: true,
            confirmButtonText: "Yes, Add it",
            cancelButtonText: "No, cancel",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.$store
                .dispatch("STORE_PRODUCT_TYPE_DETAIL", payload)
                .then((response) => {
                  if (response === "success") {
                    this.$swal.fire({
                      icon: "success",
                      title: "Success!",
                      text: "Adding Product Successfully!.",
                    });
                    this.$store.commit("SELECTED_PRODUCT_TYPE_DETAILS", null);
                    this.$store.commit("PRODUCT_TYPE_DETAILS_DIALOG", null);
                    this.$store.dispatch("GET_PRODUCT_TYPE_DETAIL");
                  }
                });
            } else {
              this.$swal.fire({
                icon: "question",
                title: "Action Cancelled",
                text: "You cancelled the Adding operation.",
              });
            }
          });
      } else if (this.PRODUCT_TYPE_DETAILS_DIALOG === "UPDATE") {
        const payload = {
          request: {
            name: this.name,
          },
          id: this.SELECTED_PRODUCT_TYPE_DETAILS.id,
        };
        this.$store
          .dispatch("UPDATE_PRODUCT_TYPE_DETAIL_BY_ID", payload)
          .then((response) => {
            if (response === "success") {
              this.$swal.fire({
                icon: "success",
                title: "Success!",
                text: "Product Type Updated Successfully!.",
              });
              this.$store.commit("SELECTED_PRODUCT_TYPE_DETAILS", null);
              this.$store.commit("PRODUCT_TYPE_DETAILS_DIALOG", null);
              this.$store.dispatch("GET_PRODUCT_TYPE_DETAIL");
            }
          });
      }
    },
  },
  computed: {
    ...mapGetters([
      "SELECTED_PRODUCT_TYPE_DETAILS",
      "PRODUCT_TYPE_DETAILS_DIALOG",
    ]),
  },
  mounted() {
    if (this.PRODUCT_TYPE_DETAILS_DIALOG === "UPDATE") {
      this.name = this.SELECTED_PRODUCT_TYPE_DETAILS.name;
    }
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
