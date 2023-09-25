<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card elevation="0">
          <v-data-table :headers="headers" :items="APPLICANTS">
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.applicant_name }}</td>
                <td>
                  <v-chip>{{ item.status }}</v-chip>
                </td>
                <td>{{ item.user_role_name }}</td>
                <td>{{ item.gender }}</td>
                <td>{{ item.age }}</td>
                <td>
                  <v-icon @click="view(item.user_role_id)">mdi-eye</v-icon>
                  <v-icon
                    v-if="item.status === 'pending'"
                    text
                    @click="dissaprove(item.user_role_id)"
                    >mdi-close</v-icon
                  >
                  <v-icon
                    v-if="item.status === 'pending'"
                    text
                    @click="approve(item.user_role_id)"
                    >mdi-check</v-icon
                  >
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      headers: [
        {
          text: "Name",
          value: "applicant_name",
          align: "center",
          sortable: false,
        },
        { text: "Status", value: "status", align: "center", sortable: false },
        {
          text: "Role",
          value: "user_role_name",
          align: "center",
          sortable: false,
        },
        { text: "Gender", value: "gender", align: "center", sortable: false },
        { text: "Age", value: "age", align: "center", sortable: false },
        { text: "Actions", value: "actions", align: "center", sortable: false },
      ],
    };
  },

  methods: {
    view(item) {
      this.$store.commit("SELECTED_CREDENTIAL", item);
    },
    approve(item) {
      this.$store.dispatch("APPROVE_USER_ROLE", item).then(() => {
        this.$store.dispatch("GET_APPLICANTS");
      });
    },
    dissaprove(item) {
      this.$store.dispatch("DISAPPROVE_USER_ROLE", item).then(() => {
        this.$store.dispatch("GET_APPLICANTS");
      });
    },
  },

  computed: {
    ...mapGetters(["APPLICANTS"]),
  },

  mounted() {
    this.$store.dispatch("GET_APPLICANTS");
  },
};
</script>
