<template>
    <v-container>
        <br><br>
        <h1>USER_ROLE</h1>
        <RequirementDialog v-if="SELECTED_REQUIREMENT !== null"/>
        <RequirementDetails v-if="REQUIREMENT_DETAIL_BOTTOMSHEET !== null"/>
        <UserRoleTable/>
    </v-container>
</template>
<script>
    import { mapGetters } from 'vuex';
    import RequirementTable from '../tables/RequirementTable.vue';
    import UserRoleTable from '../tables/UserRoleTable.vue';
    import RequirementDialog from '../dialogs/RequirementDialog.vue';
    import RequirementDetails from '../BottomSheet/RequirementDetails.vue';
    export default{
        components: { RequirementTable,RequirementDialog,RequirementDetails,UserRoleTable},
        computed: {
            ...mapGetters([
                'SELECTED_REQUIREMENT',
                'SELECTED_REQUIREMENT_DETAIL',
                'REQUIREMENT_DETAIL_BOTTOMSHEET'
            ])
        },
    }
</script>