<template>
  <v-app style="background: #f6f6f6">
    <v-container>
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
