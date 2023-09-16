<template>
    <v-container>
        <h1>PRODUCT TYPE DETAILS</h1>
        <ProductTypeDetailTable/>
    </v-container>
</template>

<script>
    import ProductTypeDetailTable from '../Tables/ProductTypeDetailTable.vue';
    export default{
        components: { ProductTypeDetailTable}
    }
</script>