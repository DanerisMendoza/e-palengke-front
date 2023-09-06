<template>
    <v-app>
        <v-container>
            <v-card-text>
            <Registration/>
            <v-btn color="secondary" @click="backToLogin">Back To Login</v-btn>
            </v-card-text>
        </v-container>
    </v-app>
</template>

<script>
    import Registration from '../components/Registration.vue';
    export default{
        components: { Registration},
        methods: {
            backToLogin(){
                this.$router.push('/Login');
            }
        }
    }
</script>