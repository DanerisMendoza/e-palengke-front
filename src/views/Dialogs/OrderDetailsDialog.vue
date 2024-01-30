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
                <v-row v-if="SELECTED_ORDER_DETAILS.status === 'To Receive' || SELECTED_ORDER_DETAILS.transactions_status === 'To Pickup' || SELECTED_ORDER_DETAILS.transactions_status === 'Dropped off'">
                    <v-col cols="12">
                        <v-container>
                            <v-card>
                                <v-row>
                                    <!-- Delivery Information -->
                                    <v-col>
                                        <v-card-title>Delivery</v-card-title>
                                        <v-card-text>
                                            Name: {{ TRANSACTION.delivery_name }}
                                            <br>
                                            Contact: {{ TRANSACTION.phone_number }}
                                        </v-card-text>
                                    </v-col>

                                    <!-- Profile Picture -->
                                    <v-col>
                                        <v-img :src="require('@/assets/profilePic.jpg')" class="mr-3 float-right"
                                            max-width="150" style="border-radius: 5rem;"></v-img>
                                    </v-col>
                                </v-row>
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
            "ORDERS", "SELECTED_ORDER_DETAILS", "TRANSACTION"
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