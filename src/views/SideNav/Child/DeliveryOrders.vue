<template>
  <v-app style="background: #c8e0f6">
    <v-container class="container">
      <div class="page-title">
        <p class="text-h4">Delivery Orders</p>
      </div>

      <OrderDetailsDialog v-if="SELECTED_ORDER_DETAILS !== null" />
      <!-- <OrdersTable /> -->
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
    this.$store.commit("ORDERS_TABLE_MODE", "delivery");
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
