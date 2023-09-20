<template>
    <v-container>
        <h1>INVENTORY PAGE</h1>
        <v-btn @click="addNewProduct">Add New Product</v-btn>
        <ProductDialog v-if="PRODUCT_DIALOG !== null" />
        <ProductTable/>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex';
    import ProductDialog from '../Dialogs/ProductDialog.vue';
    import ProductTable from '../Tables/ProductTable.vue';
    export default{
        components: { ProductDialog,ProductTable},
        computed: {
            ...mapGetters([
                'PRODUCT_DIALOG'
            ])
        },
        methods:{
            addNewProduct(){
                this.$store.commit('PRODUCT_DIALOG','ADD')
            }
        },
        mounted(){
            this.$store.commit('PRODUCT_TABLE_VIEWER','INVENTORY')
        }
    }
</script>