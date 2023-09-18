<template>
  <v-container>
    <v-data-table :headers="headers" :items="MY_APPLICATION">
      <!-- Add a custom render function for the "Actions" column -->
      <template v-slot:item="{ item }">
        <tr>
          <td style="text-align: center;">{{ item.name }}</td>
          <td style="text-align: center;">{{ item.status }}</td>
          <td style="text-align: center;">
            <v-btn text @click="view(item.user_role_id)">
                        <v-icon>mdi-file-multiple</v-icon>
                    </v-btn> <!-- Pass the whole item to the view method -->
        
          </td>
        </tr>
      </template>
    </v-data-table>

    <!-- Autocomplete component -->
    <v-autocomplete
      v-if="user_role.length !== 0"
      v-model="selected_user_role"
      :items="user_role"
      item-text="name"
      item-value="id"
      auto-select-first
      chips
      deletable-chips
      @change="handleUserRoleChange"
    ></v-autocomplete>

    <!-- File input components generated based on user_role_details -->
    <v-file-input
      v-for="(item, index) in user_role_details"
      :key="index"
      :label="item.name"
      v-model="item.value"
      @change="handleFileChange()"
      accept="image/*"
    ></v-file-input>

    <!-- Image Viewer Modal -->
    <v-dialog v-model="showImageViewer" max-width="800">
      <v-img :src="selectedImage" max-height="600"></v-img>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="closeImageViewer">Close</v-btn>
      </v-card-actions>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      user_role: [],
      user_role_details: [],
      selected_user_role: null,
      headers: [
        { text: "Role", value: 'user_role_name', align: "center", sortable: false },
        { text: "Status", value: 'status', align: "center", sortable: false },
        { text: 'Actions', value: 'actions', align: "center", sortable: false },
      ],
      showImageViewer: false,
      selectedImage: null, // Initialize selectedImage
    };
  },
  computed: {
    ...mapGetters([
      "USER_ROLE_DETAILS",
      "USER_DETAILS",
      "MY_APPLICATION",
      "USER_DETAILS",
      "SELECTED_ROLE_CLEAR",
    ]),
  },
  watch: {
    SELECTED_ROLE_CLEAR: {
      handler(val) {
        if (val === true) {
          this.user_role_details = [];
          this.user_role = [];
          this.$store.commit("SELECTED_USER_ROLE_DETAILS", null);
          this.$store.commit("SELECTED_ROLE_CLEAR", false);
        }
      },
    },
  },
  methods: {
    handleUserRoleChange(item) {
      this.$store.dispatch("GET_REQUIREMENT_DETAIL_BY_USER_ROLE_DETAILS_ID", item).then((response) => {
        this.user_role_details = response;
        this.$store.commit("SELECTED_USER_ROLE_DETAILS", item);
      });
    },
    handleFileChange() {
      this.$store.commit("APPLICANT_CREDENTIALS", this.user_role_details);
    },
    view(item) {
      this.$store.commit('SELECTED_CREDENTIAL',item)
    },
    closeImageViewer() {
      this.showImageViewer = false;
      this.selectedImage = null; // Clear the selectedImage
    },
  },
  mounted() {
    this.$store.dispatch('GET_MY_APPLICANTS', this.USER_DETAILS.user_id);
    this.$store.dispatch("GET_USER_ROLE_DETAILS").then((response) => {
      const activatedUserRole = this.USER_DETAILS.user_role_ids.filter((item) => {
        return item.status == 'active';
      });
      const pendingUserRole = this.USER_DETAILS.user_role_ids.filter((item) => {
        return item.status == 'pending';
      });
      this.user_role = response.filter((item) => {
        return (item.id != 1 && item.id != 2);
      });
      this.user_role = this.user_role.filter(item => {
        return !activatedUserRole.some(userRole => userRole.id === item.id);
      });
      this.user_role = this.user_role.filter(item => {
        return !pendingUserRole.some(userRole => userRole.id === item.id);
      });
    });
  },
};
</script>
