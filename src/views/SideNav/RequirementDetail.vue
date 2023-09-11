<template>
    <v-container>
        <br><br>
        <h1>REQUIREMENT DETAILS PAGE</h1>
        
        <RequirementDialog v-if="SELECTED_REQUIREMENT !== null"/>
        <RequirementDetails v-if="REQUIREMENT_DETAIL_BOTTOMSHEET !== null"/>
        <RequirementTable/>
    </v-container>
</template>
<script>
    import { mapGetters } from 'vuex';
    import RequirementTable from '../Tables/RequirementTable.vue';
    import RequirementDialog from '../Dialogs/RequirementDialog.vue';
    import RequirementDetails from '../BottomSheet/RequirementDetails.vue';
    // import RequirementEditDialog from '../Dialogs/RequirementEditDialog.vue';

    export default{
        components: { RequirementTable, RequirementDialog, RequirementDetails},
        computed: {
            ...mapGetters([
                'SELECTED_REQUIREMENT',
                'SELECTED_REQUIREMENT_DETAILS',
                'REQUIREMENT_DETAIL_BOTTOMSHEET'
            ])
        },
    }
</script>