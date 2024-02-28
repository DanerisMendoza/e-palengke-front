<template>
    <v-app style="background: #d0dae3">
        <v-container>
            <v-app-bar app color="primary" dark elevation="2">
                LOGIN PAGE
                <v-spacer></v-spacer>
                <v-btn plain @click="registration">sign up</v-btn>
                <span class="ml-5 mr-5">|</span>
                <v-btn plain @click="login">login</v-btn>
                <span class="ml-5 mr-5">|</span>
                <v-btn plain @click="mobile">mobile (apk)</v-btn>
            </v-app-bar>
            <v-card class="text-center login-card mb-5" elevation="2" outlined>
                <v-img src="../../assets/mobileQR.png" alt="E-Palengke Mobile QR CODE"></v-img>
            </v-card>
            <br>
            <h3 class="text-center">MOBILE APK</h3> 
            <h3 class="text-center "><a href="https://epalengke.shop/E-Palengke.apk">Download Mobile APK</a></h3>
        </v-container>
    </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {


    computed: {
        ...mapGetters(["SIDE_NAV"]),
    },


    methods: {
        login() {
            this.$router.push("/Login");
        },
        registration() {
            this.$router.push("/Registration");
        },
        mobile() {
            this.$router.push("/Mobile");
        }
    },
};
</script>
  
<style scoped>
.login-btn {
    width: 100%;
}

.login-card {
    width: 25rem;
    position: relative;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* padding: 1rem 2rem; */
}
</style>
  