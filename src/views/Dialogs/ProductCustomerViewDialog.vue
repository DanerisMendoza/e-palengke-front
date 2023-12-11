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
                <!-- <v-card-title>Order Status: </v-card-title> -->
                <ProductTable />
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import ProductTable from "../Tables/ProductTable.vue";
export default {
    components: { ProductTable },
    data() {
        return {
            dialog: true
        }
    },
    computed: {
        ...mapGetters([
           "SELECTED_ORDER_STATUS"
        ]),
    },
    methods: {
        closeDialog() {
            this.$store.commit('PRODUCT_CUSTOMER_VIEW_DIALOG', false)
        }
    }
}
</script>