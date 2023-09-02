<template>
    <v-app>
        <RequirementDialog v-if="REQUIREMENT_DIALOG"/>
        <RequirementTable/>
    </v-app>
</template>
<script>
    import { mapGetters } from 'vuex';
    import RequirementTable from '../tables/Requirement.vue';
    import RequirementDialog from '../dialogs/RequirementDialog.vue';
    export default{
        components: { RequirementTable,RequirementDialog},
        computed: {
            ...mapGetters([
                'SELECTED_REQUIREMENT',
                'REQUIREMENT_DIALOG',
            ])
        },
        watch: {
            SELECTED_REQUIREMENT: {
                handler(val) {
                    console.log(val)
                },
            },
        }
    }
</script>