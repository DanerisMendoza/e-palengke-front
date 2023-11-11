<template>
  <v-app style="background: #f6f6f6">
    <v-container>
      <StoreTypeDialog v-if="STORE_TYPE_DETAILS_DIALOG !== null" />
      <StoreTypeDetailTable />
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import StoreTypeDetailTable from "../Tables/StoreTypeDetailTable.vue";
import StoreTypeDialog  from "../Dialogs/StoreTypeDialog.vue";
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
