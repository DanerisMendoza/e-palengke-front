<template>
    <v-container>
        <br><br>
        <h1>Applicants Window</h1>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default{
        computed: {
            ...mapGetters([
                "APPLICANTS",
            ]),
        },
        mounted(){
            this.$store.dispatch('GET_APPLICANTS').then((response)=>{
                console.log(this.APPLICANTS)
            })
        }
    }
</script>