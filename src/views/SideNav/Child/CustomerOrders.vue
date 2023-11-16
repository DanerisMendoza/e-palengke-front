<template>
  <v-app style="background: #d0dae3">
    <v-container>
      <v-card class="customer-orders">
        <h2 class="font-weight-bold mb-3">{{ $route.name }}</h2>

        <OrderStatusDialog v-if="SELECTED_ORDER_STATUS !== null" />
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
import OrderStatusDialog from "../../Dialogs/OrderStatusDialog.vue";

export default {
  components: { OrdersTable, OrderDetailsDialog, OrderStatusDialog },
  computed: {
    ...mapGetters([
      "ORDERS",
      "SELECTED_ORDER_DETAILS",
      "USER_DETAILS",
      "SELECTED_ORDER_STATUS",
    ]),
  },
  created() {
    this.$store.commit("ORDERS_TABLE_MODE", "customer");
  },
};
</script>

<style scoped>
.customer-orders {
  border-top: 5px solid #1976d2;
  padding: 1rem;
}
</style>
