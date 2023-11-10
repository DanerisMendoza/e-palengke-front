<template>
  <v-app style="background: #f6f6f6">
    <v-container>
      <v-card elevation="1" outlined>
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
    </v-container>
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
    ...mapGetters(["STORE_TYPE_DETAIL"]),
  },

  methods: {
    deleteItem(item) {
      this.$store.dispatch("DELETE_STORE_TYPE_DETAIL_BY_ID", item.id);
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
        then((result) => {
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
                  this.$store.dispatch("GET_STORE_TYPE_DETAIL",this.STORE_TYPE_DETAIL.id);
                }
              });
          }
        });
    },
    editItem(item) {
      console.log(item);
      // this.$store.commit("SELECTED_REQUIREMENT_DETAILS", item);
      // this.$store.commit("REQUIREMENT_DETAIL_BOTTOMSHEET", 'UPDATE');
      console.log('Edit button clicked');
    },
  },

  mounted() {
    this.$store.dispatch("GET_STORE_TYPE_DETAIL").then((response) => {
      console.log(response)
      console.log(this.STORE_TYPE_DETAIL)
    });
    this.$store.commit('STORE_TYPE_DETAIL',[1,2,3])
    console.log(this.STORE_TYPE_DETAIL)
    console.log(this.headers)
    this.$store.dispatch("GET_USER_ROLE_WITH_ACCESSESS_AND_REQUIREMENTS")
  },
};
</script>
