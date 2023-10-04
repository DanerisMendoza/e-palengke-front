<template>
    <v-container>
        <v-card>
            <v-data-table v-if="ORDERS_TABLE_MODE === 'store'" :headers="store_headers" :items="ORDERS[SELECTED_ORDER_DETAILS].order_details">
                <template v-slot:item="{ item }">
                    <tr>
                        <td>{{ item.name }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>₱{{ item.price }}</td>
                        <td>₱{{ item.price * item.quantity }}</td>
                    </tr>
                </template>
            </v-data-table>
            <v-data-table v-else-if="ORDERS_TABLE_MODE === 'customer'" :headers="customer_headers" :items="ORDERS[SELECTED_ORDER_DETAILS].order_details">
                <template v-slot:item="{ item }">
                    <tr>
                        <td>{{ item.name }}</td>
                        <td>{{ item.store_name }}</td>
                        <td>{{ item.address }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>₱{{ item.price }}</td>
                        <td>₱{{ item.price * item.quantity }}</td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            store_headers: [
                { text: "Product Name", align: "center", sortable: false },
                { text: "Quantity ", align: "center", sortable: false },
                { text: "Price ", align: "center", sortable: false },
                { text: "Sub Total ", align: "center", sortable: false },
            ],
            customer_headers: [
                { text: "Product Name", align: "center", sortable: false },
                { text: "Store Name", align: "center", sortable: false },
                { text: "Store Address", align: "center", sortable: false },
                { text: "Quantity ", align: "center", sortable: false },
                { text: "Price ", align: "center", sortable: false },
                { text: "Sub Total ", align: "center", sortable: false },
            ],
        }
    },
    computed: {
        ...mapGetters([
            "ORDERS", "SELECTED_ORDER_DETAILS","ORDERS_TABLE_MODE"
        ]),
    },
    mounted() {
        console.log(this.ORDERS[this.SELECTED_ORDER_DETAILS].order_details)
    }
}
</script>