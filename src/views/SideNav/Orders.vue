<template>
    <v-container>
        <v-switch v-if="switchExist" v-model="ordersTableSwitch" label="Store/Customer"></v-switch>
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
    data() {
        return {
            ordersTableSwitch: false,
            switchExist: false,
        }
    },
    watch: {
        ordersTableSwitch: {
            handler(val) {
                if (val) {
                    this.$store.commit('ORDERS_TABLE_MODE', 'customer')
                }
                else {
                    this.$store.commit('ORDERS_TABLE_MODE', 'store')
                }
            },
        }
    },
    created() {
        this.switchExist = (this.USER_DETAILS.user_role_details.some(role => role.id === 3));
        if(this.switchExist){
            this.$store.commit('ORDERS_TABLE_MODE', 'store')
        }
        else{
            this.$store.commit('ORDERS_TABLE_MODE', 'customer')
        }
    }
}
</script>