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
    import ProductDetails from '../BottomSheet/ProductDetails.vue';
    export default{
        components: { ProductDialog, ProductTable, ProductDetails},
        computed: {
            ...mapGetters([
                'PRODUCT_DIALOG',
                'SELECTED_PRODUCT_DETAILS',
                'PRODUCT_TYPE_BOTTOMSHEET'
            ])
        },
        methods:{
            addNewProduct(){
                this.$store.commit('PRODUCT_DIALOG','ADD')
                console.log(this.PRODUCT_DIALOG);
                // this.$store.commit('PRODUCT_DIALOG','UPDATE')
            }
        },
        created(){
            this.$store.commit('PRODUCT_TABLE_VIEWER','INVENTORY')
        }
    }
</script>