<template>
  <v-container fluid class=" ma-0 pa-0">
    <v-card>
      <v-data-table :headers="headers" :items="USER_ROLES">
        <template v-slot:item="{ item }">
          <tr>
            <td style="text-align: center;">{{ item.name }}</td>
            <td style="text-align: center;">
              <v-chip class='mr-1' v-for="(RequirementDetail, i) in item.RequirementDetails" :key="i">
                <v-row class="d-flex justify-center align-center pr-3">
                  <v-col cols="12">
                    <div class="text d-flex justify-center ml-3">
                      {{ RequirementDetail.requirement_detailsName }}
                    </div>
                  </v-col>
                </v-row>
              </v-chip>
            </td>
            <td style="text-align: center;">
              <v-chip class='mr-1' v-for="(Access, i) in item.Accesses" :key="i">
                <v-row class="d-flex justify-center align-center pr-3">
                  <v-col cols="12">
                    <div class="text d-flex justify-center ml-3">
                      {{ Access.side_nav_name }}
                    </div>
                  </v-col>
                </v-row>
              </v-chip>
            </td>
            <td style="text-align: center;">
              <!-- <v-icon @click="viewItem(item)" class="mr-2">mdi-eye</v-icon> -->
              <v-icon @click="editItem(item)">mdi-pencil</v-icon>
              <!-- <v-icon @click="deleteItem(item)">mdi-delete</v-icon> -->
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script>

import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      headers: [
        { text: "User-Role", align: "center", sortable: false },
        { text: "Requirements", align: "center", sortable: false },
        { text: "Access", align: "center", sortable: false },
        { text: 'Actions', align: "center", value: 'actions', sortable: false },
      ],
    }
  },

  computed: {
    ...mapGetters([
      'USER_ROLES',
    ])
  },

  methods: {
    viewItem(item) {

    },
    editItem(item) {
      // console.log(item)
      this.$store.commit("SELECTED_ROLE", item)
    },
    deleteItem(item) {

    },
  },

  mounted() {
    this.$store.dispatch("GET_USER_ROLE_WITH_ACCESSESS_AND_REQUIREMENTS")
  }
}
</script>