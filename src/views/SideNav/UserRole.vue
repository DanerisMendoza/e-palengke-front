<template>
  <v-app style="background: #c8e0f6">
    <v-container class="container">
      <div class="page-title">
        <p class="text-h4">User Role</p>
      </div>

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

<style scoped>
.page-title p {
  margin-bottom: 1rem;
  color: #0c3a68;
}
.container {
  padding: 0 2.5rem 0;
}
</style>
