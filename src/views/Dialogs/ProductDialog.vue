<template>
  <v-container>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="30rem" persistent>
        <v-card>
          <v-card-title> Add New Product </v-card-title>

          <v-card-text>
            <v-form ref="myForm" @submit.prevent="submitForm">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.name"
                    label="Enter Product Name"
                    :rules="rules.required"
                    outlined
                    hide-details="auto"
                    class="mb-3"
                    dense
                  ></v-text-field>
                  <v-text-field
                    v-model="form.price"
                    label="Enter Product Price"
                    :rules="rules.required"
                    outlined
                    hide-details="auto"
                    class="mb-3"
                    dense
                  ></v-text-field>
                  <v-text-field
                    v-model="form.stock"
                    label="Enter Product Stock"
                    :rules="rules.required"
                    outlined
                    hide-details="auto"
                    class="mb-3"
                    dense
                  ></v-text-field>
                  <v-file-input
                    v-model="file"
                    label="Input Image"
                    accept="image/*"
                    :rules="rules.required"
                    outlined
                    hide-details="auto"
                    dense
                  ></v-file-input>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="closeDialog()">close</v-btn>
            <v-btn color="success" text @click="submit()">{{
              PRODUCT_DIALOG
            }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      bottom_sheet: true,
      form: {
        store_id: null,
        name: null,
        price: null,
        stock: null,
      },
      file: null,
      dialog: true,
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
      this.$store.commit("PRODUCT_DIALOG", null);
      this.$store.commit("SELECTED_PRODUCT_DETAILS", null);
    },
    submit() {
      if (this.$refs.myForm.validate()) {
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

        if (this.PRODUCT_DIALOG === "UPDATE") {
          // Update existing product
          const updatePayload = {
            request: {
              name: this.form.name,
              price: this.form.price,
              stock: this.form.stock,
            },
            id: this.SELECTED_PRODUCT_DETAILS.id,
          };

          this.$store
            .dispatch("UPDATE_PRODUCT_BY_ID", updatePayload)
            .then((response) => {
              if (response === "success") {
                this.$swal.fire({
                  icon: "success",
                  title: "Success!",
                  text: "Product Updated Successfully!.",
                });
                this.$store.commit("SELECTED_PRODUCT_DETAILS", null);
                this.$store.commit("PRODUCT_DIALOG", null);
                this.$store.dispatch("GET_PRODUCT_BY_ID", this.form.store_id);
              }
            });
        } else {
          // Store a new product
          this.$store.dispatch("STORE_PRODUCT", payload).then((response) => {
            if (response === "success") {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Operation was successful!",
                showConfirmButton: false,
                timer: 1000,
              });
              this.$store.commit("PRODUCT_DIALOG", null);
              this.$store.dispatch("GET_PRODUCT_BY_ID", this.form.store_id);
            }
          });
        }
      }
    },
  },

  computed: {
    ...mapGetters([
      "PRODUCT_DIALOG",
      "USER_DETAILS",
      "SELECTED_PRODUCT_DETAILS",
    ]),
  },
  mounted() {
    // Ensure the store_id is set when the component is mounted
    this.form.store_id = this.USER_DETAILS.user_role_details
      .filter((item) => item.id === 3 && item.status === "active")
      .map((item) => item.store_details[0].store_id)[0];

    if (this.PRODUCT_DIALOG === "UPDATE") {
      this.form.name = this.SELECTED_PRODUCT_DETAILS.name;
      this.form.price = this.SELECTED_PRODUCT_DETAILS.price;
      this.form.stock = this.SELECTED_PRODUCT_DETAILS.stock;
    }
  },
};
</script>
