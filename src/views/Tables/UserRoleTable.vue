<template>
  <v-app style="background: #d0dae3">
    <v-card class="user-role">
      <v-card elevation="2" outlined>
        <v-data-table :headers="headers" :items="USER_ROLES">
          <template v-slot:item="{ item, index }">
            <tr>
              <td>{{ index + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>
                <v-chip class="mr-1 mt-1" v-for="(RequirementDetail, i) in item.RequirementDetails" :key="i">
                  <div>
                    {{ RequirementDetail.requirement_detailsName }}
                  </div>
                </v-chip>
              </td>
              <td>
                <v-chip class="mr-1 mt-1" v-for="(Access, i) in item.Accesses" :key="i">
                  <div>
                    {{ Access.side_nav_name }}
                  </div>
                </v-chip>
              </td>
              <td>
                <!-- <v-icon @click="viewItem(item)" class="mr-2">mdi-eye</v-icon> -->
                <v-icon @click="editItem(item)" color="orange">mdi-pencil</v-icon>
                <!-- <v-icon @click="deleteItem(item)">mdi-delete</v-icon> -->
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
        { text: "No.", align: "center", sortable: false },
        { text: "USER ROLE", align: "center", sortable: false },
        { text: "REQUIREMENTS", align: "center", sortable: false },
        { text: "ACCESS", align: "center", sortable: false },
        { text: "ACTIONS", align: "center", value: "actions", sortable: false },
      ],
    };
  },

  computed: {
    ...mapGetters(["USER_ROLES"]),
  },

  methods: {
    viewItem(item) { },
    editItem(item) {
      // console.log(item)
      this.$store.commit("SELECTED_ROLE", item);
    },
    deleteItem(item) { },
  },

  mounted() {
    this.$store.dispatch("GET_USER_ROLE_WITH_ACCESSESS_AND_REQUIREMENTS");
  },
};
</script>

<style scoped>
.user-role {
  border-top: 5px solid #1976d2;
  padding: 1rem;
}
</style>
