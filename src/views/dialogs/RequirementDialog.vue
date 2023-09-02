<template>
    <!-- <v-container fluid> -->
        <v-dialog v-model="dialog">
            <v-card>
                <h1>aaa</h1>
            </v-card>
        </v-dialog>
    <!-- </v-container> -->
</template>

<script>
 import { mapGetters } from 'vuex';
    export default{
        data(){
            return {
                dialog:true
            } 
        },
        mounted(){
            console.log('aaa')
        },
        computed: {
            ...mapGetters([
                'SELECTED_REQUIREMENT',
            ])
        },
    }
</script>