<template>
  <v-container>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="500px" persistent>
        <v-card>
          <v-card-title>USER ROLE: {{ SELECTED_ROLE.name }}</v-card-title>
          <v-card-text>
            <v-autocomplete
              v-model="selected_requirement"
              :items="REQUIREMENT_DETAILS"
              item-text="name"
              item-value="id"
              auto-select-first
              chips
              deletable-chips
              multiple
              label="Requirement"
              outlined
              hide-details="auto"
              class="mb-5"
            ></v-autocomplete>
            <v-autocomplete
              v-model="selected_sidenav"
              readonly
              :items="ALL_SIDE_NAV"
              item-text="name"
              item-value="id"
              auto-select-first
              chips
              deletable-chips
              multiple
              label="Access"
              outlined
              hide-details="auto"
            ></v-autocomplete>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="closeDialog()">CLOSE</v-btn>
            <v-btn color="success" text @click="update()">UPDATE</v-btn>
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
      dialog: true,
      selected_sidenav: [],
      selected_requirement: [],
    };
  },
  methods: {
    closeDialog() {
      this.$store.commit("SELECTED_ROLE", null);
      this.selected_sidenav = null;
      this.selected_requirement = null;
    },

    async GET_REQUIREMENT_DETAILS() {
      await this.$store.dispatch("GET_REQUIREMENT_DETAILS");
    },

    async GetAllSideNav() {
      await this.$store.dispatch("GetAllSideNav");
    },

    update() {
      const payload = {
        id: this.SELECTED_ROLE.id,
        selected_sidenav: this.selected_sidenav,
        selected_requirement: this.selected_requirement,
      };
      this.$store
        .dispatch("UPDATE_USER_ROLE_BY_ID", payload)
        .then((response) => {
          if (response == "success") {
            this.$swal.fire({
              icon: "success", // Set the success icon
              title: "Success", // Title of the alert
              text: "Operation was successful!", // Text message
              showConfirmButton: false, // Remove the "OK" button
              timer: 1000, // Auto-close the alert after 1.5 seconds (adjust as needed)
            });
            this.$store
              .dispatch("GET_USER_ROLE_WITH_ACCESSESS_AND_REQUIREMENTS")
              .then(() => {
                this.$store.commit("SELECTED_ROLE", null);
                this.selected_sidenav = null;
                this.selected_requirement = null;
              });
          }
        });
    },
  },
  computed: {
    ...mapGetters(["SELECTED_ROLE", "ALL_SIDE_NAV", "REQUIREMENT_DETAILS"]),
  },

  mounted() {
    console.log(this.SELECTED_ROLE);
    this.GET_REQUIREMENT_DETAILS().then(() => {
      this.selected_requirement = this.SELECTED_ROLE.RequirementDetails.map(
        (item) => {
          return item.requirement_details_id;
        }
      );
    });
    this.GetAllSideNav().then(() => {
      this.selected_sidenav = this.SELECTED_ROLE.Accesses.map((item) => {
        return item.sidenav_id;
      });
    });
  },
};
</script>
