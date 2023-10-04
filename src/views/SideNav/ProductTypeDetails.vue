<template>
  <v-app>
    <v-container>
        <h2>PRODUCT DETAILS</h2>
      <ProductTypeDetailTable />
    </v-container>
  </v-app>
</template>

<script>
import ProductTypeDetailTable from "../Tables/ProductTypeDetailTable.vue";
export default {
  components: { ProductTypeDetailTable },
};
</script>
