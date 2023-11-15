<template>
    <v-container>
        <v-dialog v-model="dialog" persistent>
            <v-card>
                <v-row>
                    <v-col>
                        <v-btn text icon class="float-right" @click="closeDialog()">
                            <v-icon>mdi-close-circle</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row v-if="SELECTED_ORDER_DETAILS.status === 'To Receive'">
                    <v-col cols="12">
                        <v-container>
                            <v-card>
                                <v-card-title>Delivery</v-card-title>
                                <v-card-text>Name: {{ TRANSACTION.delivery_name }} </v-card-text>
                                <v-card-text>Contact: {{ TRANSACTION.phone_number }} </v-card-text>
                            </v-card>
                        </v-container>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <OrderDetailsTable />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <!-- <v-text-field outlined readonly class="float-right mr-15 mt-15">
                            <template v-slot:append>
                                Total: ₱{{ total.toFixed(2) }}
                            </template>
                        </v-text-field> -->
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex';
import OrderDetailsTable from '../Tables/OrderDetailsTable.vue';
export default {
    components: { OrderDetailsTable },
    data() {
        return {
            dialog: true
        }
    },
    computed: {
        ...mapGetters([
            "ORDERS", "SELECTED_ORDER_DETAILS","TRANSACTION"
        ]),
        total() {
            return ''
            // return this.ORDERS[this.SELECTED_ORDER_DETAILS].order_details.reduce((total, item) => total + (item.price * item.quantity), 0);
        }
    },
    methods: {
        closeDialog() {
            this.$store.commit("SELECTED_ORDER_DETAILS", null)
        },
        async getTransactionDetails() {
            const payload = {
                params: {
                    transaction_id: this.SELECTED_ORDER_DETAILS.transaction_id,
                }
            }
            await this.$store.dispatch('GET_TRANSACTION_BY_ID', payload).then(() => {
                console.log(this.TRANSACTION)
            })

        }
    },
    mounted() {
        this.getTransactionDetails()

        // console.log(this.SELECTED_ORDER_DETAILS)
    }
}
</script>