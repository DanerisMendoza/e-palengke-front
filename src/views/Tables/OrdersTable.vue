<template>
    <v-card>
        <v-data-table :headers="headers" :items="ORDERS">
            <template v-slot:item="{ item , index}">
                <tr>
                    <td>{{ item.id }}</td>
                    <td>{{ item.customer_name }}</td>
                    <td>{{ formatDate(item.created_at) }}</td>
                    <td>₱{{ item.total }}</td>
                    <td>
                        <v-btn @click="viewOrderDetails(index)">
                            <v-icon>mdi-view-list</v-icon>
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
            headers: [
                { text: "Order ID",  align: "center", sortable: false },
                { text: "Customer Name", value: "customer_name", align: "center", sortable: false },
                { text: "Date ", align: "center", sortable: false },
                { text: "Total ", align: "center", sortable: false },
                { text: "Actions", align: "center", sortable: false },
            ],
        }
    },
    computed: {
        ...mapGetters([
            "USER_DETAILS", "ORDERS"
        ]),
        store_id() {
            return (this.USER_DETAILS.user_role_ids.find((item) => item.id === 3 && item.status === 'active')?.store_id);
        }
    },
    methods: {
        formatDate(date) {
            return moment(date).format('hh:mm A | YYYY-MM-DD');
        },
        viewOrderDetails(index){
            this.$store.commit('SELECTED_ORDER_DETAILS',index)
            console.log(this.ORDERS[index])
        }
    },
    mounted() {
        // console.log('orders table')
        // console.log(this.store_id)
        this.$store.dispatch('GET_ORDERS_BY_STORE_ID', this.store_id).then(() => {
            console.log(this.ORDERS)
        })
    }
}
</script>