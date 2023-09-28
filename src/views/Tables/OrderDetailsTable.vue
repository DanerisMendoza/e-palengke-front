<template>
    <v-container>
        <v-card>
            <v-data-table :headers="headers" :items="ORDERS[SELECTED_ORDER_DETAILS].order_details">
                <template v-slot:item="{ item }">
                    <tr>
                        <td>{{ item.name }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>₱{{ item.price }}</td>
                        <td>₱{{ item.price*item.quantity }}</td>
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
            headers: [
                { text: "Product Name", value: "name", align: "center", sortable: false },
                { text: "Quantity ", value: "quantity", align: "center", sortable: false },
                { text: "Price ", value: "price", align: "center", sortable: false },
                { text: "Sub Total ", align: "center", sortable: false },
            ],
        }
    },
    computed: {
        ...mapGetters([
            "ORDERS", "SELECTED_ORDER_DETAILS"
        ]),
    },
    mounted() {
    }
}
</script>