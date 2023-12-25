<template>
    <v-container>
        <v-card>
            <v-data-table v-if="ORDERS_TABLE_MODE === 'store'" :headers="store_headers" :items="ORDER_DETAILS">
                <template v-slot:item="{ item, index }">
                    <tr>
                        <td>{{ index+1 }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.status }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>₱{{ item.price }}</td>
                        <td>₱{{ item.price * item.quantity }}</td>
                    </tr>
                </template>
            </v-data-table>
            <v-data-table v-else-if="ORDERS_TABLE_MODE === 'customer'"
                :headers="SELECTED_ORDER_DETAILS.status === 'Pending' ? customer_headers : customer_headers2"
                :items="ORDER_DETAILS">
                <template v-slot:item="{ item, index }">
                    <tr>
                        <td>{{ index+1 }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.store_name }}</td>
                        <td>{{ item.address }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>₱{{ item.price }}</td>
                        <td>₱{{ item.price * item.quantity }}</td>
                        <td v-if="SELECTED_ORDER_DETAILS.status == 'Pending'">
                            <v-btn @click="CANCEL_ORDER_DETAIL(item)">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>
            <v-data-table v-else-if="ORDERS_TABLE_MODE === 'delivery'" :headers="customer_headers" :items="ORDER_DETAILS">
                <template v-slot:item="{ item, index }">
                    <tr>
                        <td>{{ index+1 }}</td>
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
                { text: "No.", align: "center", sortable: false },
                { text: "Product Name", align: "center", sortable: false },
                { text: "Status ", align: "center", sortable: false },
                { text: "Quantity ", align: "center", sortable: false },
                { text: "Price ", align: "center", sortable: false },
                { text: "Sub Total ", align: "center", sortable: false },
            ],
            customer_headers: [
                { text: "No.", align: "center", sortable: false },
                { text: "Product Name", align: "center", sortable: false },
                { text: "Store Name", align: "center", sortable: false },
                { text: "Store Address", align: "center", sortable: false },
                { text: "Quantity ", align: "center", sortable: false },
                { text: "Price ", align: "center", sortable: false },
                { text: "Sub Total ", align: "center", sortable: false },
                { text: "Actions", align: "center", sortable: false },
            ],
            customer_headers2: [
                { text: "No.", align: "center", sortable: false },
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
            "ORDERS", "SELECTED_ORDER_DETAILS", "ORDERS_TABLE_MODE", "ORDER_DETAILS", "TRANSACTION", "USER_DETAILS"
        ]),
    },
    methods: {
        CANCEL_ORDER_DETAIL(item) {
            const payload = { item }
            this.$store.dispatch('CANCEL_ORDER_DETAIL', payload).then((response) => {
                if (response === 'success') {
                    const payload = {
                        params: {
                            order_id: this.SELECTED_ORDER_DETAILS.order_id,
                            store_id: this.SELECTED_ORDER_DETAILS.store_id
                        }
                    }
                    this.$store.dispatch('GET_ORDER_DETAILS', payload)
                    const payload2 = {
                        params: {
                            mode: 'customer'
                        }
                    }
                    this.$store.dispatch('GET_ORDERS', payload2)
                    this.$store.dispatch("GetUserDetails")
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Order Cancel Success',
                        timer: 2000
                    });
                }
            })
        },
        async getOrderDetails() {
            const payload = {
                params: {
                    order_id: this.SELECTED_ORDER_DETAILS.order_id,
                    store_id: this.SELECTED_ORDER_DETAILS.store_id
                }
            }
            await this.$store.dispatch('GET_ORDER_DETAILS', payload).then(() => {
                // console.log(this.ORDER_DETAILS)
            })
        },

    },
    mounted() {
        this.getOrderDetails()
        const channel = 'channel-OrderDetailsEvent' + this.USER_DETAILS.user_id
        this.$Echo.channel(channel).listen('OrderDetailsEvent', e => {
            if(e.result){  
                this.getOrderDetails()
            }
        });
    }
}
</script>