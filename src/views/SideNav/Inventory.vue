<template>
  <v-app style="background: #c8e0f6">
    <v-container class="container">
      <div class="page-title">
        <p class="text-h4">Inventory</p>
      </div>

      <v-btn @click="addNewProduct" class="mb-5" color="primary"
        >Add Product</v-btn
      >

      <ProductDialog v-if="PRODUCT_DIALOG !== null" />
      <ProductTable />
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import ProductDialog from "../Dialogs/ProductDialog.vue";
import ProductTable from "../Tables/ProductTable.vue";
import ProductDetails from "../BottomSheet/ProductDetails.vue";
export default {
  components: { ProductDialog, ProductTable, ProductDetails },
  computed: {
    ...mapGetters([
      "PRODUCT_DIALOG",
      "SELECTED_PRODUCT_DETAILS",
      "PRODUCT_TYPE_BOTTOMSHEET",
    ]),
  },
  methods: {
    addNewProduct() {
      this.$store.commit("PRODUCT_DIALOG", "ADD");
      console.log(this.PRODUCT_DIALOG);
      // this.$store.commit('PRODUCT_DIALOG','UPDATE')
    },
  },
  created() {
    this.$store.commit("PRODUCT_TABLE_VIEWER", "INVENTORY");
  },
};
</script>

<!-- <style scoped>
.inventory {
  border-top: 5px solid #1976d2;
  padding: 1rem;
}
</style>
 -->

<style scoped>
.page-title p {
  margin-bottom: 1rem;
  color: #0c3a68;
}
.container {
  padding: 0 2.5rem 0;
}
</style>
