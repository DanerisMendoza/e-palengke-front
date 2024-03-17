<template>
  <v-app style="background: #c8e0f6">
    <v-container class="container">
      <div class="page-title">
        <p class="text-h4">Requirement Details</p>
      </div>

      <StoreTypeDialog v-if="STORE_TYPE_DETAILS_DIALOG !== null" />
      <StoreTypeDetailTable />
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import StoreTypeDetailTable from "../Tables/StoreTypeDetailTable.vue";
import StoreTypeDialog from "../Dialogs/StoreTypeDialog.vue";
import StoreTypeDetails from "../BottomSheet/StoreTypeDetails.vue";

export default {
  components: { StoreTypeDetailTable, StoreTypeDetails, StoreTypeDialog },
  computed: {
    ...mapGetters([
      "SELECTED_STORE_TYPE_DETAILS",
      "STORE_TYPE_DETAILS_BOTTOMSHEET",
      "STORE_TYPE_DETAILS_DIALOG",
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
