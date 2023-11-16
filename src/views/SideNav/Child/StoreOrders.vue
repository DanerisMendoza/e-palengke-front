<template>
  <v-app style="background: #d0dae3">
    <v-container>
      <v-card class="store-orders">
        <h2 class="font-weight-bold mb-3">{{ $route.name }}</h2>
        <OrderDetailsDialog v-if="SELECTED_ORDER_DETAILS !== null" />
        <OrdersTable />
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import OrdersTable from "../../Tables/OrdersTable.vue";
import OrderDetailsDialog from "../../Dialogs/OrderDetailsDialog.vue";

export default {
  components: { OrdersTable, OrderDetailsDialog },
  computed: {
    ...mapGetters(["ORDERS", "SELECTED_ORDER_DETAILS", "USER_DETAILS"]),
  },
  created() {
    this.$store.commit("ORDERS_TABLE_MODE", "store");
  },
};
</script>

<style scoped>
.store-orders {
  border-top: 5px solid #1976d2;
  padding: 1rem;
}
</style>
