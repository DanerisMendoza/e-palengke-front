<template>
  <v-app style="background: #f6f6f6">
    <v-container>
      <v-card elevation="1" outlined>
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
                  color="red"
                  >mdi-close</v-icon
                >
                <v-icon
                  v-if="item.status === 'pending'"
                  text
                  @click="approve(item.user_role_id)"
                  color="green"
                  >mdi-check</v-icon
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
        {
          text: "NAME",
          value: "applicant_name",
          align: "center",
          sortable: false,
        },
        { text: "STATUS", value: "status", align: "center", sortable: false },
        {
          text: "USER ROLE",
          value: "user_role_name",
          align: "center",
          sortable: false,
        },
        { text: "GENDER", value: "gender", align: "center", sortable: false },
        { text: "AGE", value: "age", align: "center", sortable: false },
        { text: "ACTIONS", value: "actions", align: "center", sortable: false },
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
