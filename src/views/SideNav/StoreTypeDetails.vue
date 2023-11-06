<template>
  <v-app style="background: #f6f6f6">
    <v-container>
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
