<template>
  <v-app>
    <v-container>
      <h2>STORE TYPE DETAILS</h2>
      <StoreTypeDetailTable />
    </v-container>
  </v-app>
</template>

<script>
import StoreTypeDetailTable from "../Tables/StoreTypeDetailTable.vue";
export default {
  components: { StoreTypeDetailTable },
};
</script>
