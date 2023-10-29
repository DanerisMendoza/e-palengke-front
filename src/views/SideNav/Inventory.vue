<template>
    <v-container>
        <v-btn @click="addNewProduct" class="mb-2">Add New Product</v-btn>
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
        created(){
            this.$store.commit('PRODUCT_TABLE_VIEWER','INVENTORY')
        }
    }
</script>