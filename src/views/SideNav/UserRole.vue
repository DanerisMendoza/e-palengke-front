<template>
    <v-container>
        <br><br>
        <h1>USER_ROLE</h1>
        <UserRoleDialog v-if="SELECTED_ROLE !== null"/>
        <UserRoleTable/>
    </v-container>
</template>
<script>
    import { mapGetters } from 'vuex';
    import UserRoleTable from '@/views/Tables/UserRoleTable';
    import UserRoleDialog from '@/views/Dialogs/UserRoleDialog';
    export default{
        components: { UserRoleDialog,UserRoleTable},
        computed: {
            ...mapGetters([
                'SELECTED_ROLE',
            ])
        },
    }
</script>