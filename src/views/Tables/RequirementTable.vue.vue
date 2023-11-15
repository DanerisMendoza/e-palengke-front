<template>
  <v-app style="background: #f6f6f6">
    <v-container>
      <v-btn @click="addNewRequirement()" elevation="0" class="mb-5" dark>
        add new requirement
      </v-btn>

      <v-card elevation="1" outlined>
        <v-data-table :headers="headers" :items="REQUIREMENT_DETAILS">
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.name }}</td>
              <td>
                <v-icon @click="editItem(item)" color="orange">mdi-pencil</v-icon>
                <v-icon @click="deleteItem(item)" color="red">mdi-delete</v-icon>
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
        { text: "REQUIREMENT DETAILS", align: "center", sortable: false },
        { text: "ACTIONS", align: "center", value: "actions", sortable: false },
      ],
    };
  },

  computed: {
    ...mapGetters([
      "REQUIREMENTS",
      "REQUIREMENT_DETAILS",
      "SELECTED_REQUIREMENT_DETAILS",
      "REQUIREMENT_DETAIL_DIALOG",
    ]),
  },

  methods: {
    viewItem(item) { },
    editItem(item) {
      this.$store.commit("SELECTED_REQUIREMENT_DETAILS", item);
      this.$store.commit("REQUIREMENT_DETAIL_DIALOG", "UPDATE");
      console.log(this.REQUIREMENT_DETAIL_DIALOG);
    },
    addNewRequirement() {
      this.$store.commit("REQUIREMENT_DETAIL_DIALOG", "ADD");
      console.log(this.REQUIREMENT_DETAIL_DIALOG);
    },
    deleteItem(item) {
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
              .dispatch("DELETE_REQUIREMENT_DETAIL_BY_ID", item.id)
              .then((response) => {
                if (response === "success") {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Item Deleted Successfully.",
                  });
                  this.$store.dispatch("GET_REQUIREMENT_DETAILS",this.SELECTED_REQUIREMENT_DETAILS.id);
                }
              });
          }
        });
    },
  },

  mounted() {
    this.$store.dispatch("GET_REQUIREMENT_DETAILS")
  },
};
</script>
