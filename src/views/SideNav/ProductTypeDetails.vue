<template>
    <v-container>
        <br><br>
        <h1>PRODUCT TYPE DETAILS PAGE</h1>
        <ProductTypeDetailTable/>
    </v-container>
</template>

<script>
    import ProductTypeDetailTable from '../Tables/ProductTypeDetailTable.vue';
    export default{
        components: { ProductTypeDetailTable}
    }
</script>