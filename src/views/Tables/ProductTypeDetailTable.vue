<template>
  <v-app style="background: #c8e0f6">
    <div>
      <v-btn @click="addNewProductType()" color="primary" class="mb-5">
        add product type
      </v-btn>
    </div>

    <v-card elevation="2" outlined>
      <v-data-table :headers="headers" :items="PRODUCT_TYPE_DETAIL">
        <template v-slot:item="{ item, index }">
          <tr>
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>
              <!-- <v-icon @click="viewItem(item)" class="mr-2">mdi-eye</v-icon> -->
              <v-icon @click="editItem(item)" color="orange">mdi-pencil</v-icon>
              <v-icon @click="deleteItem(item)" color="red">mdi-delete</v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      headers: [
        { text: "No.", align: "center", sortable: false },
        { text: "NAME", value: "name", align: "center", sortable: false },
        { text: "ACTIONS", align: "center", value: "actions", sortable: false },
      ],
    };
  },

  computed: {
    ...mapGetters([
      "PRODUCT_TYPE_DETAIL",
      "SELECTED_PRODUCT_TYPE_DETAILS",
      "PRODUCT_TYPE_DETAILS_DIALOG",
    ]),
  },

  methods: {
    viewItem(item) {},
    editItem(item) {
      this.$store.commit("SELECTED_PRODUCT_TYPE_DETAILS", item);
      this.$store.commit("PRODUCT_TYPE_DETAILS_DIALOG", "UPDATE");
      console.log(this.PRODUCT_TYPE_DETAILS_DIALOG);
    },
    addNewProductType() {
      this.$store.commit("PRODUCT_TYPE_DETAILS_DIALOG", "ADD");
      console.log(this.PRODUCT_TYPE_DETAILS_DIALOG);
    },
    deleteItem(item) {
      // this.$store.dispatch("DELETE_PRODUCT_TYPE_DETAIL_BY_ID", item.id);
      this.$swal
        .fire({
          icon: "warning",
          title: "Delete Item",
          text: "Are you sure you want to delete this item?",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it",
          cancelButtonText: "No, cancel",
          confirmButtonColor: "#d33",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$store
              .dispatch("DELETE_PRODUCT_TYPE_DETAIL_BY_ID", item.id)
              .then((response) => {
                if (response === "success") {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Item Deleted Successfully.",
                  });
                  this.$store.dispatch(
                    "GET_PRODUCT_TYPE_DETAIL",
                    this.SELECTED_PRODUCT_TYPE_DETAILS.id
                  );
                }
              });
          }
        });
    },
  },

  mounted() {
    this.$store.dispatch("GET_PRODUCT_TYPE_DETAIL");
    // .then((response) => {
    //   console.log(response);
    //   console.log(this.PRODUCT_TYPE_DETAIL);
    // });
  },
};
</script>

<style scoped>
.product-type-details {
  border-top: 5px solid #1976d2;
  padding: 1rem;
}
</style>
