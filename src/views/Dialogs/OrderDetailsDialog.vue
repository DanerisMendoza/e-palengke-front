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
                <v-row>
                    <v-col cols="12">
                        <OrderDetailsTable />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-text-field outlined readonly class="float-right mr-15 mt-15">
                            <template v-slot:append>
                                Total: ₱{{ total.toFixed(2) }}
                            </template>
                        </v-text-field>
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
            "ORDERS", "SELECTED_ORDER_DETAILS"
        ]),
        total() {
            return this.ORDERS[this.SELECTED_ORDER_DETAILS].order_details.reduce((total, item) => total + (item.price * item.quantity), 0);
        }
    },
    methods: {
        closeDialog() {
            this.$store.commit("SELECTED_ORDER_DETAILS", null)
        },
    },
    mounted(){
    }
}
</script>