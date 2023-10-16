<template>
    <v-card>
        <v-data-table v-if="ORDERS_TABLE_MODE === 'store'" :headers="store_headers" :items="ORDERS">
            <template v-slot:item="{ item, index }">
                <tr>
                    <td>{{ item.customer_name }}</td>
                    <td>{{ formatDate(item.created_at) }}</td>
                    <td>{{ item.status }}</td>
                    <td>₱{{ item.total }}</td>
                    <td>
                        <v-btn @click="viewOrderDetails(index)">
                            <v-icon>mdi-view-list</v-icon>
                        </v-btn>
                        <v-btn @click="viewOrderDetails(index)">
                            <v-icon>mdi-check</v-icon>
                        </v-btn>
                        <v-btn @click="viewOrderDetails(index)">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </td>
                </tr>
            </template>
        </v-data-table>
        <v-data-table v-else-if="ORDERS_TABLE_MODE === 'customer'" :headers="customer_headers" :items="ORDERS">
            <template v-slot:item="{ item, index }">
                <tr>
                    <td>{{ formatDate(item.created_at) }}</td>
                    <td>{{ item.status }}</td>
                    <td>₱{{ item.total }}</td>
                    <td>
                        <v-btn @click="viewOrderDetails(index)">
                            <v-icon>mdi-view-list</v-icon>
                        </v-btn>
                        <v-btn @click="viewOrderDetails(index)">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </td>
                </tr>
            </template>
        </v-data-table>
        <v-data-table v-else-if="ORDERS_TABLE_MODE === 'delivery'" :headers="store_headers" :items="ORDERS">
            <template v-slot:item="{ item, index }">
                <tr>
                    <td>{{ item.customer_name }}</td>
                    <td>{{ formatDate(item.created_at) }}</td>
                    <td>{{ item.status }}</td>
                    <td>₱{{ item.total }}</td>
                    <td>
                        <v-btn @click="viewOrderDetails(index)">
                            <v-icon>mdi-view-list</v-icon>
                        </v-btn>
                        <v-btn @click="viewOrderDetails(index)">
                            <v-icon>mdi-map-marker</v-icon>
                        </v-btn>
                        <v-btn @click="viewOrderDetails(index)">
                            <v-icon>mdi-check</v-icon>
                        </v-btn>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </v-card>
</template>
<script>
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
    data() {
        return {
            store_headers: [
                { text: "Customer Name", align: "center", sortable: false },
                { text: "Date ", align: "center", sortable: false },
                { text: "Status ", align: "center", sortable: false },
                { text: "Total ", align: "center", sortable: false },
                { text: "Actions", align: "center", sortable: false },
            ],
            customer_headers: [
                { text: "Date ", align: "center", sortable: false },
                { text: "Status ", align: "center", sortable: false },
                { text: "Total ", align: "center", sortable: false },
                { text: "Actions", align: "center", sortable: false },
            ],
        }
    },
    computed: {
        ...mapGetters([
            "USER_DETAILS", "ORDERS", "ORDERS_TABLE_MODE"
        ]),
        store_id() {
            return (this.USER_DETAILS.user_role_ids.find((item) => item.id === 3 && item.status === 'active')?.store_id);
        }
    },
    methods: {
        formatDate(date) {
            return moment(date).format('hh:mm A | YYYY-MM-DD');
        },
        viewOrderDetails(index) {
            this.$store.commit('SELECTED_ORDER_DETAILS', index)
            console.log(this.ORDERS[index])
        }
    },
    mounted() {
        if (this.ORDERS_TABLE_MODE === 'customer') {
            const payload = { mode: 'customer' }
            this.$store.dispatch('GET_ORDERS_BY_USER_ID',payload).then(() => {
                console.log(this.ORDERS)
            })
        }
        else if (this.ORDERS_TABLE_MODE === 'store') {
            this.$store.dispatch('GET_ORDERS_BY_STORE_ID', this.store_id).then(() => {
                console.log(this.ORDERS)
            })
        }
        else if (this.ORDERS_TABLE_MODE === 'delivery') {
            const payload = { mode: 'delivery' }
            this.$store.dispatch('GET_ORDERS_BY_USER_ID', payload).then(() => {
                console.log(this.ORDERS)
            })
        }
    }
}
</script>