<template>
    <v-container>
        <h1>INVENTORY PAGE</h1>
        <v-btn @click="addNewProduct">Add New Product</v-btn>
        <ProductDialog v-if="PRODUCT_DIALOG !== null" />
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex';
    import ProductDialog from '../Dialogs/ProductDialog.vue';
    export default{
        components: { ProductDialog},
        computed: {
            ...mapGetters([
                'PRODUCT_DIALOG'
            ])
        },
        methods:{
            addNewProduct(){
                this.$store.commit('PRODUCT_DIALOG','ADD')
            }
        }
    }
</script>