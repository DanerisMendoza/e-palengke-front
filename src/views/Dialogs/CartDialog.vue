<template>
    <v-container fluid>
        <v-dialog v-model="dialog" persistent>
            <v-card >
                <v-btn text icon class="float-right" @click="closeDialog()">
                    <v-icon>mdi-close-circle</v-icon>
                </v-btn>
                <CartTable />
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import CartTable from '../Tables/CartTable.vue';
export default {
    components: {
        CartTable
    },
    data() {
        return {
            dialog: true
        }
    },
    methods: {
        closeDialog() {
            this.$store.commit('CART_DIALOG', false)
        }
    },
}

</script>