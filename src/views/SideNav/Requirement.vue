<template>
    <v-container>
        <v-row>
            <v-col cols="2">
                <SideMenuBar/>
            </v-col>
            <v-col cols="10" class="mt-12">
                <h1>Requirement Window</h1>
                <RequirementDialog v-if="SELECTED_REQUIREMENT !== null"/>
                <RequirementDetails v-if="REQUIREMENT_DETAIL_BOTTOMSHEET !== null"/>
                <RequirementTable/>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    import { mapGetters } from 'vuex';
    import RequirementTable from '../tables/RequirementTable.vue';
    import RequirementDialog from '../dialogs/RequirementDialog.vue';
    import RequirementDetails from '../BottomSheet/RequirementDetails.vue';
    import SideMenuBar from  '@/views/components/SideMenuBar.vue'
    export default{
        components: { RequirementTable,RequirementDialog,RequirementDetails,SideMenuBar},
        computed: {
            ...mapGetters([
                'SELECTED_REQUIREMENT',
                'SELECTED_REQUIREMENT_DETAIL',
                'REQUIREMENT_DETAIL_BOTTOMSHEET'
            ])
        },
    }
</script>