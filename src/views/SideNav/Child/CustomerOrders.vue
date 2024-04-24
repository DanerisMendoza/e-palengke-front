<template>
  <v-app style="background: #c8e0f6">
    <v-container class="container">
      <div class="page-title">
        <p class="text-h4">Customer Orders</p>
      </div>

      <OrderStatusDialog v-if="SELECTED_ORDER_STATUS !== null" />
      <OrderDetailsDialog v-if="SELECTED_ORDER_DETAILS !== null" />
      <OrdersTable />
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
.page-title p {
  margin-bottom: 1rem;
  color: #0c3a68;
}
.container {
  padding: 0 2.5rem 0;
}
</style>
