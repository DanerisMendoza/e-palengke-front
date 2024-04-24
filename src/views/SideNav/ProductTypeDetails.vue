<template>
  <v-app style="background: #c8e0f6">
    <v-container class="container">
      <div class="page-title">
        <p class="text-h4">Product Type Details</p>
      </div>

      <ProductTypeDetailsDialog v-if="PRODUCT_TYPE_DETAILS_DIALOG !== null" />
      <ProductTypeDetailTable />
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import ProductTypeDetailTable from "../Tables/ProductTypeDetailTable.vue";
import ProductTypeDetailsDialog from "../Dialogs/ProductTypeDetailsDialog.vue";
import ProductTypeDetails from "../BottomSheet/ProductTypeDetails.vue";

export default {
  components: {
    ProductTypeDetailTable,
    ProductTypeDetails,
    ProductTypeDetailsDialog,
  },
  computed: {
    ...mapGetters([
      "SELECTED_PRODUCT_TYPE_DETAILS",
      "PRODUCT_TYPE_DETAILS_BOTTOMSHEET",
      "PRODUCT_TYPE_DETAILS_DIALOG",
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
