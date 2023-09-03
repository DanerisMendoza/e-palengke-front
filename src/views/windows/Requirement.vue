<template>
    <v-container>
        <h1>Requirement Window</h1>
        <RequirementDialog v-if="SELECTED_REQUIREMENT !== null"/>
        <RequirementDetails v-if="REQUIREMENT_DETAIL_BOTTOMSHEET !== null"/>
        <RequirementTable/>
    </v-container>
</template>
<script>
    import { mapGetters } from 'vuex';
    import RequirementTable from '../tables/RequirementTable.vue';
    import RequirementDialog from '../dialogs/RequirementDialog.vue';
    import RequirementDetails from '../BottomSheet/RequirementDetails.vue';
    export default{
        components: { RequirementTable,RequirementDialog,RequirementDetails},
        computed: {
            ...mapGetters([
                'SELECTED_REQUIREMENT',
                'SELECTED_REQUIREMENT_DETAIL',
                'REQUIREMENT_DETAIL_BOTTOMSHEET'
            ])
        },
        // watch: {
        //     SELECTED_REQUIREMENT: {
        //         handler(val) {
        //             console.log(val)
        //         },
        //     },
        // }
    }
</script>