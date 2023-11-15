<template>
  <v-app style="background: #d0dae3">
    <v-container>
      <v-card class="inventory">
        <h2 class="font-weight-bold mb-3">{{ $route.name }}</h2>

        <v-btn @click="addNewProduct" class="mb-5" color="primary">Add New Product</v-btn>
        <ProductDialog v-if="PRODUCT_DIALOG !== null" />
        <ProductTable />
      </v-card>
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

<style scoped>
.inventory {
  border-top: 5px solid #1976d2;
  padding: 1rem;
}
</style>
