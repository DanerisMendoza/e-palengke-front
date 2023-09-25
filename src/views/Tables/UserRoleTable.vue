<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card elevation="0">
          <v-data-table :headers="headers" :items="USER_ROLES">
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.name }}</td>
                <td>
                  <v-chip
                    class="mr-1 mt-1"
                    v-for="(RequirementDetail, i) in item.RequirementDetails"
                    :key="i"
                  >
                    <div>
                      {{ RequirementDetail.requirement_detailsName }}
                    </div>
                  </v-chip>
                </td>
                <td>
                  <v-chip
                    class="mr-1 mt-1"
                    v-for="(Access, i) in item.Accesses"
                    :key="i"
                  >
                    <div>
                      {{ Access.side_nav_name }}
                    </div>
                  </v-chip>
                </td>
                <td>
                  <!-- <v-icon @click="viewItem(item)" class="mr-2">mdi-eye</v-icon> -->
                  <v-icon @click="editItem(item)">mdi-pencil</v-icon>
                  <!-- <v-icon @click="deleteItem(item)">mdi-delete</v-icon> -->
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
        { text: "User Role", align: "center", sortable: false },
        { text: "Requirements", align: "center", sortable: false },
        { text: "Access", align: "center", sortable: false },
        { text: "Actions", align: "center", value: "actions", sortable: false },
      ],
    };
  },

  computed: {
    ...mapGetters(["USER_ROLES"]),
  },

  methods: {
    viewItem(item) {},
    editItem(item) {
      // console.log(item)
      this.$store.commit("SELECTED_ROLE", item);
    },
    deleteItem(item) {},
  },

  mounted() {
    this.$store.dispatch("GET_USER_ROLE_WITH_ACCESSESS_AND_REQUIREMENTS");
  },
};
</script>
