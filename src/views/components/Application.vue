<template>
  <div>
    <v-card elevation="2" outlined class="mb-5">
      <v-data-table :headers="headers" :items="MY_APPLICATION">
        <template v-slot:item="{ item }">
          <tr>
            <td style="text-align: center">{{ item.name }}</td>
            <td style="text-align: center">
              <v-chip color="primary">{{ item.status }}</v-chip>
            </td>
            <td style="text-align: center">
              <v-btn @click="view(item)" icon><v-icon>mdi-eye</v-icon></v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>

    <!-- Autocomplete component -->
    <v-row>
      <v-col cols="12" md="4">
        <v-autocomplete
          v-if="user_role.length !== 0"
          v-model="selected_user_role"
          :items="user_role"
          label="Select Application"
          item-text="name"
          item-value="id"
          auto-select-first
          chips
          deletable-chips
          @change="handleUserRoleChange"
          outlined
          hide-details="auto"
        ></v-autocomplete>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-file-input
          v-for="(item, index) in user_role_details"
          :key="index"
          :label="item.name"
          v-model="item.value"
          @change="handleFileChange()"
          accept="image/*"
          :rules="rules.required"
          outlined
          hide-details="auto"
          class="mb-3"
        ></v-file-input>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      user_role: [],
      user_role_details: [],
      selected_user_role: null,
      headers: [
        {
          text: "ROLE",
          value: "applicant_name",
          align: "center",
          sortable: false,
        },
        { text: "STATUS", value: "status", align: "center", sortable: false },
        { text: "ACTIONS", value: "actions", align: "center", sortable: false },
      ],
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
          this.selected_user_role = null;
          this.$store.commit("SELECTED_USER_ROLE_DETAILS", null);
          this.$store.commit("SELECTED_ROLE_CLEAR", false);
          this.$store.dispatch("GetUserDetails").then((response) => {
            this.getUserRoleDetails();
          });
        }
      },
    },
  },
  methods: {
    view(item) {
      this.$store.commit("SELECTED_CREDENTIAL", item.id);
    },
    handleUserRoleChange(item) {
      this.$store
        .dispatch("GET_REQUIREMENT_DETAIL_BY_USER_ROLE_DETAILS_ID", item)
        .then((response) => {
          this.user_role_details = response;
          this.$store.commit("SELECTED_USER_ROLE_DETAILS", item);
        });
    },
    handleFileChange() {
      this.$store.commit("APPLICANT_CREDENTIALS", this.user_role_details);
    },
    getUserRoleDetails() {
      this.$store.dispatch("GET_USER_ROLE_DETAILS").then((response) => {
        const activatedUserRole = this.USER_DETAILS.user_role_details.filter(
          (item) => {
            return item.status == "active";
          }
        );
        const pendingUserRole = this.USER_DETAILS.user_role_details.filter(
          (item) => {
            return item.status == "pending";
          }
        );
        this.user_role = response.filter((item) => {
          return item.id != 1 && item.id != 2;
        });
        this.user_role = this.user_role.filter((item) => {
          return !activatedUserRole.some((userRole) => userRole.id === item.id);
        });
        this.user_role = this.user_role.filter((item) => {
          return !pendingUserRole.some((userRole) => userRole.id === item.id);
        });
      });
    },
  },
  created() {
    this.$store.commit("SELECTED_USER_ROLE_DETAILS", null);
  },
  mounted() {
    this.$store.dispatch("GET_MY_APPLICANTS", this.USER_DETAILS.user_id);
    this.getUserRoleDetails();
  },
};
</script>
