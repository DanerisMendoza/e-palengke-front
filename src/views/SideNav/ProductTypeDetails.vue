<template>
  <v-app style="background: #f6f6f6">
    <v-container>
      <ProductTypeDetailsDialog v-if="PRODUCT_TYPE_DETAILS_DIALOG !== null" />
      <ProductTypeDetailTable />
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import ProductTypeDetailTable from "../Tables/ProductTypeDetailTable.vue";
import ProductTypeDetailsDialog  from "../Dialogs/ProductTypeDetailsDialog.vue";
import ProductTypeDetails from "../BottomSheet/ProductTypeDetails.vue";

export default {
  components: { ProductTypeDetailTable, ProductTypeDetails, ProductTypeDetailsDialog,},
  computed: {
    ...mapGetters([
      "SELECTED_PRODUCT_TYPE_DETAILS",
      "PRODUCT_TYPE_DETAILS_BOTTOMSHEET",
      "PRODUCT_TYPE_DETAILS_DIALOG",
    ]),
  },
};
</script>
