<template>
  <v-app style="background: #c8e0f6">
    <v-container class="container">
      <div class="page-title">
        <p class="text-h4">Requirement Details</p>
      </div>

      <RequirementDialog v-if="REQUIREMENT_DETAIL_DIALOG !== null" />
      <RequirementTable />
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import RequirementTable from "../Tables/RequirementTable.vue.vue";
import RequirementDialog from "../Dialogs/RequirementDialog.vue";
import RequirementDetails from "../BottomSheet/RequirementDetails.vue";

export default {
  components: { RequirementDialog, RequirementDetails, RequirementTable },
  computed: {
    ...mapGetters([
      "SELECTED_REQUIREMENT",
      "SELECTED_REQUIREMENT_DETAILS",
      "REQUIREMENT_DETAIL_BOTTOMSHEET",
      "REQUIREMENT_DETAIL_DIALOG",
    ]),
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
