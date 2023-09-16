<template>
    <v-container>
        <br><br>
        <h1>STORE TYPE DETAILS PAGE</h1>
        <StoreTypeDetailTable/>
    </v-container>
</template>

<script>
    import StoreTypeDetailTable from '../Tables/StoreTypeDetailTable.vue';
    export default{
        components: { StoreTypeDetailTable}
    }
</script>