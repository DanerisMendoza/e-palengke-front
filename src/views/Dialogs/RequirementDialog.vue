<template>
  <v-container>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="30rem" persistent>
        <v-card>
          <v-card-title>Requirement Details</v-card-title>
          <v-card-text>
            <v-text-field
              label="Enter New Requirement"
              v-model="name"
              hide-details="auto"
              outlined
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="closeDialog()">close</v-btn>
            <v-btn color="green" text @click="handleOperation()">
              {{ REQUIREMENT_DETAIL_DIALOG }}
            </v-btn>
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
      name: null,
      dialog: true,
      headers: [
        { text: "Name", align: "center", value: "name", sortable: false },
        { text: "Actions", align: "center", value: "actions", sortable: false },
      ],
      editedItem: null,
    };
  },
  methods: {
    closeDialog() {
      this.$store.commit("REQUIREMENT_DETAIL_DIALOG", null);
      this.$store.commit("SELECTED_REQUIREMENT_DETAILS", null);
    },

    handleOperation() {
      if (this.REQUIREMENT_DETAIL_DIALOG === "ADD") {
        const payload = { name: this.name };
        this.$swal
          .fire({
            icon: "question",
            title: "Adding Requirement",
            text: "Are you sure you want to add a new requirement?",
            showCancelButton: true,
            confirmButtonText: "Yes, Add it",
            cancelButtonText: "No, cancel",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.$store
                .dispatch("STORE_REQUIREMENT_DETAIL", payload)
                .then((response) => {
                  if (response === "success") {
                    this.$swal.fire({
                      icon: "success",
                      title: "Success!",
                      text: "Adding Requirent Successfully!.",
                    });
                    this.$store.commit("SELECTED_REQUIREMENT_DETAILS", null);
                    this.$store.commit("REQUIREMENT_DETAIL_DIALOG", null);
                    this.$store.dispatch("GET_REQUIREMENT_DETAILS");
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
      } else if (this.REQUIREMENT_DETAIL_DIALOG === "UPDATE") {
        const payload = {
          request: {
            name: this.name,
          },
          id: this.SELECTED_REQUIREMENT_DETAILS.id,
        };
        this.$store
          .dispatch("UPDATE_REQUIREMENT_DETAIL_BY_ID", payload)
          .then((response) => {
            if (response === "success") {
              this.$swal.fire({
                icon: "success",
                title: "Success!",
                text: "Requirement Updated Successfully!.",
              });
              this.$store.commit("SELECTED_REQUIREMENT_DETAILS", null);
              this.$store.commit("REQUIREMENT_DETAIL_DIALOG", null);
              this.$store.dispatch("GET_REQUIREMENT_DETAILS");
            }
          });
      }
    },
  },
  computed: {
    ...mapGetters([
      "SELECTED_REQUIREMENT_DETAILS",
      "REQUIREMENT_DETAIL_DIALOG",
    ]),
  },
  mounted() {
    if (this.REQUIREMENT_DETAIL_DIALOG === "UPDATE") {
      this.name = this.SELECTED_REQUIREMENT_DETAILS.name;
    }
  },
};
</script>
