<template>
    <v-dialog v-model="dialog" persistent>
        <v-card>
            <v-card-title>
                <v-btn text icon @click="closeDialog" class="ml-auto">
                    <v-icon>mdi-close-circle</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <CartTable />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-text-field outlined readonly class="float-right mr-15">
                            <template v-slot:append>
                                Total: ₱{{ total.toFixed(2) }}
                            </template>
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-btn class="float-right mr-15">
                            <v-icon>mdi-cart-outline</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
  

<script>
import CartTable from '../Tables/CartTable.vue';
import { mapGetters } from 'vuex';
export default {
    components: {
        CartTable
    },
    data() {
        return {
            dialog: true
        }
    },
    computed: {
        ...mapGetters(["SELECTED_STORE", "CART"]),
        total() {
            return this.CART.reduce((total, item) => total + (item.price*item.quantity), 0);
        }
    },
    methods: {
        closeDialog() {
            this.$store.commit('CART_DIALOG', false)
            const selectedStore = this.SELECTED_STORE
            this.$store.commit('SELECTED_STORE', null)
            this.$store.commit('SELECTED_STORE', selectedStore)
        }
    },
}

</script>