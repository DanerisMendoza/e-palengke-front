<template>
    <v-container>
        <h1>PROFILE PAGE</h1>
        <ProfileTable/>
    </v-container>
</template>

<script>
 import ProfileTable from '../Tables/ProfileTable.vue';
    export default{
        components: { ProfileTable}
    }
</script>