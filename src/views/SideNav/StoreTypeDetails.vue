<template>
    <v-container>
        <h1>STORE TYPE DETAILS</h1>
        <StoreTypeDetailTable/>
    </v-container>
</template>

<script>
    import StoreTypeDetailTable from '../Tables/StoreTypeDetailTable.vue';
    export default{
        components: { StoreTypeDetailTable}
    }
</script>