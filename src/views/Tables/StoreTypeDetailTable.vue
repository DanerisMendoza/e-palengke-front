<template>
  <v-app style="background: #d0dae3">
    <v-card class="store-type-details">
      <h2 class="font-weight-bold mb-3">{{ $route.name }}</h2>

      <v-btn @click="addNewStoreType()" color="primary" class="mb-5">
        add new Store Type
      </v-btn>

      <v-card elevation="2" outlined>
        <v-data-table :headers="headers" :items="STORE_TYPE_DETAIL">
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.name }}</td>
              <td>
                <!-- <v-icon @click="viewItem(item)" class="mr-2">mdi-eye</v-icon> -->
                <v-icon @click="editItem(item)" color="orange"
                  >mdi-pencil</v-icon
                >
                <v-icon @click="deleteItem(item)" color="red"
                  >mdi-delete</v-icon
                >
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </v-card>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      headers: [
        { text: "NAME", value: "name", align: "center", sortable: false },
        { text: "ACTIONS", align: "center", value: "actions", sortable: false },
      ],
    };
  },

  computed: {
    ...mapGetters([
      "STORE_TYPE_DETAIL",
      "SELECTED_STORE_TYPE_DETAILS",
      "STORE_TYPE_DETAILS_DIALOG",
    ]),
  },

  methods: {
    viewItem(item) {},
    editItem(item) {
      this.$store.commit("SELECTED_STORE_TYPE_DETAILS", item);
      this.$store.commit("STORE_TYPE_DETAILS_DIALOG", "UPDATE");
      console.log(this.STORE_TYPE_DETAILS_DIALOG);
    },
    addNewStoreType() {
      this.$store.commit("STORE_TYPE_DETAILS_DIALOG", "ADD");
      console.log(this.STORE_TYPE_DETAILS_DIALOG);
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
              .dispatch("DELETE_STORE_TYPE_DETAIL_BY_ID", item.id)
              .then((response) => {
                if (response === "success") {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Item Deleted Successfully.",
                  });
                  this.$store.dispatch(
                    "GET_STORE_TYPE_DETAIL",
                    this.SELECTED_STORE_TYPE_DETAILS.id
                  );
                }
              });
          }
        });
    },
  },
  // editItem(item) {
  //   console.log(item);
  //   this.$store.commit("PRODUCT_TYPE_DETAILS_BOTTOMSHEET", 'UPDATE');
  // },

  mounted() {
    this.$store.dispatch("GET_STORE_TYPE_DETAIL");
    // .then((response) => {
    //   console.log(response);
    //   console.log(this.PRODUCT_TYPE_DETAIL);
    // });
  },
};
</script>

<style scoped>
.store-type-details {
  border-top: 5px solid #1976d2;
  padding: 1rem;
}
</style>
