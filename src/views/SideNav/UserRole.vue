<template>
  <v-app>
    <v-container>
      <h2>USER ROLE</h2>
      <UserRoleDialog v-if="SELECTED_ROLE !== null" />
      <UserRoleTable />
    </v-container>
  </v-app>
</template>
<script>
import { mapGetters } from "vuex";
import UserRoleTable from "@/views/Tables/UserRoleTable";
import UserRoleDialog from "@/views/Dialogs/UserRoleDialog";
export default {
  components: { UserRoleDialog, UserRoleTable },
  computed: {
    ...mapGetters(["SELECTED_ROLE"]),
  },
};
</script>
