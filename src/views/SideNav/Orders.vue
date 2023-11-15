<template>
    <v-container>
        <OrderDetailsDialog v-if="SELECTED_ORDER_DETAILS !== null" />
        <OrdersTable />
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex';
import OrdersTable from '../Tables/OrdersTable.vue';
import OrderDetailsDialog from '../Dialogs/OrderDetailsDialog.vue';
export default {
    components: { OrdersTable, OrderDetailsDialog },
    computed: {
        ...mapGetters([
            "ORDERS", "SELECTED_ORDER_DETAILS","USER_DETAILS"
        ]),
    },
}
</script>