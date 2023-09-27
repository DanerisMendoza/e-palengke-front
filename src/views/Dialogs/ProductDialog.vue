<template>
  <v-container fluid>
    <v-dialog v-model="dialog" persistent>
      <v-card>
        <v-row>
          <v-col>
            <v-btn text icon class="float-right" @click="closeDialog()">
              <v-icon>mdi-close-circle</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <!-- <h1>{{ SELECTED_REQUIREMENT.name }}</h1> -->
          </v-col>
        </v-row>

        <v-form ref="myForm" @submit.prevent="submitForm">
          <v-row class="pa-5">
            <v-col cols="12">
              <v-text-field v-model="form.name" label="Enter Product Name" :rules="rules.required"></v-text-field>
              <v-text-field v-model="form.price" label="Enter Product Price" :rules="rules.required"></v-text-field>
              <v-text-field v-model="form.stock" label="Enter Product Stock" :rules="rules.required"></v-text-field>
              <v-file-input v-model="file" accept="image/*" :rules="rules.required"></v-file-input>
              <v-btn class="float-right" @click="submit()">
                {{ PRODUCT_DIALOG }}
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
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
    }
  },
  methods: {
    closeDialog() {
      this.$store.commit("PRODUCT_DIALOG", null)
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

        this.$store.dispatch("STORE_PRODUCT", payload).then((response) => {
          if (response == 'success') {
            this.$swal.fire({
              icon: 'success', // Set the success icon
              title: 'Success', // Title of the alert
              text: 'Operation was successful!', // Text message
              showConfirmButton: false, // Remove the "OK" button
              timer: 1000 // Auto-close the alert after 1.5 seconds (adjust as needed)
            });
            this.$store.commit("PRODUCT_DIALOG", null)
            this.$store.dispatch('GET_PRODUCT_BY_ID', this.form.store_id)
          }
        })
      }
    }
  },


  computed: {
    ...mapGetters([
      'PRODUCT_DIALOG',
      'USER_DETAILS'
    ])
  },
  mounted() {
    this.form.store_id = this.USER_DETAILS.user_role_ids.filter((item) => {
      return item.id === 3 && item.status === 'active'
    })[0].store_id
  },
}
</script>